import { Unsubscribe, collection, endAt, limit, onSnapshot, orderBy, query, startAt, where } from "firebase/firestore"
import { useState, useEffect } from "react"
import ReactLoading from "react-loading"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from "recharts"
import AuthService from "../../../utilities/AuthService"
import dayjs from "dayjs"
import { db } from "../../../utilities/firebase"
import Todo from "../../../entities/Todo"
import TodoService from "../../../utilities/TodoService"

interface Props {
	className?: string
}

function AchieveCountAt2DaysBarChart(props: Props) {

	// リスナーをデタッチするためのオブジェクト
	let unsub: Unsubscribe | null = null

	// Chartにセットするデータ
	const [data, setData] = useState<{ label: string, value: number }[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	async function listenTodos() {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("FAIL! Error listening todos. 未ログイン状態です。")
			setIsLoaded(true)
			return
		}

		// 昨日の開始日時と明日の開始日時を取得
		const now = dayjs()
		const startDate: Date = dayjs(`${now.year()}-${now.month() + 1}-${now.date() - 1}`).toDate()
		const endDate: Date = dayjs(`${now.year()}-${now.month() + 1}-${now.date() + 1}`).toDate()

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			orderBy("achievedAt", "asc"),
			startAt(startDate),
			endAt(endDate),
			limit(1000)
		)

		// リアルタイムリスナーを設定
		unsub = onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// 昨日のTodo達成数を取得
			let achieveCountAtYesterday = 0
			todos.forEach(todo => {

				// Todo達成日時、昨日、今日の3つのDate
				const achievedAt = todo.achievedAt!
				const now = dayjs()
				const yesterday = dayjs(`${now.year()}-${now.month() + 1}-${now.date() - 1}`).toDate()
				const today = dayjs(`${now.year()}-${now.month() + 1}-${now.date()}`).toDate()

				// 3つのDateを比較して、達成日時が昨日と今日の間かどうか判定
				if (achievedAt >= yesterday && achievedAt < today) {
					achieveCountAtYesterday += 1
				}
			})

			// 今日のTodo達成数を取得
			let achieveCountAtToday = 0
			todos.forEach(todo => {

				// Todo達成日時、今日、明日の3つのDate
				const achievedAt = todo.achievedAt!
				const now = dayjs()
				const today = dayjs(`${now.year()}-${now.month() + 1}-${now.date()}`).toDate()
				const tomorrow = dayjs(`${now.year()}-${now.month() + 1}-${now.date() + 1}`).toDate()

				// 3つのDateを比較して、達成日時が今日と明日の間かどうか判定
				if (achievedAt >= today && achievedAt < tomorrow) {
					achieveCountAtToday += 1
				}
			})

			// 昨日と今日のTodo達成数をもとに、dataを生成する
			const data = [
				{
					label: "今日",
					value: achieveCountAtToday
				},
				{
					label: "昨日",
					value: achieveCountAtYesterday
				}
			]

			// 画面に反映
			setData(data)
			setIsLoaded(true)

		}, (error) => {

			// 失敗
			console.log(`FAIL! Error listening todos. ${error}`)
			setIsLoaded(true)
		})
	}

	useEffect(() => {

		listenTodos()

		return () => {
			if (unsub !== null) unsub()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div className={`bg-white p-4 rounded-xl dark:bg-zinc-800 ${props.className}`}>

			{!isLoaded &&
				<div className="flex justify-center">

					<ReactLoading
						type="spin"
						color="#666"
						height="20px"
						width="20px"
					/>
				</div>
			}

			{isLoaded && data === null &&
				<div>
					<p className="mt-2 text-zinc-500">読み取りに失敗しました</p>
				</div>
			}

			{isLoaded && data !== null &&

				<div>

					{data[0].value > data[1].value &&
						<p>今日のTodo達成数は昨日よりも多いです。</p>
					}

					{data[0].value < data[1].value &&
						<p>今日のTodo達成数は昨日よりも少ないです。</p>
					}

					{data[0].value === data[1].value &&
						<p>今日のTodo達成数は昨日と同じです。</p>
					}

					<BarChart
						width={300}
						height={200}
						data={data}
						layout="vertical"
						className="mt-2"
					>
						<CartesianGrid stroke="#7774" />
						<XAxis type="number" stroke="#777A" domain={[0, (dataMax: number) => (dataMax < 5 ? 5 : dataMax)]} tickCount={6} />
						<YAxis type="category" dataKey="label" width={34} stroke="#777A" />
						<Bar dataKey="value" barSize={30} >

							{
								data.map((entry, index) => (
									<Cell key={index} fill={index === 0 ? "#3b82f6" : "#777"} />
								))
							}
						</Bar>
					</BarChart>
				</div>
			}
		</div>
	)
}

export default AchieveCountAt2DaysBarChart