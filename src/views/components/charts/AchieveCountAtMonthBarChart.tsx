import dayjs from "dayjs"
import { Unsubscribe, collection, endAt, limit, onSnapshot, orderBy, query, startAt, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"
import Todo from "../../../entities/Todo"
import AuthService from "../../../utilities/AuthService"
import TodoService from "../../../utilities/TodoService"
import { db } from "../../../utilities/firebase"

interface Props {
	className?: string
}

function AchieveCountAtMonthBarChart(props: Props) {

	// リスナーをデタッチするためのオブジェクト
	let unsub: Unsubscribe | null = null

	// Chartにセットするデータ
	const [data, setData] = useState<{ day: string, value: number }[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	async function listenTodos() {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("Fail! Error listening todos. 未ログイン状態です。")
			setIsLoaded(true)
			return
		}

		// 今月の開始日と終了日を取得
		const currentYear = dayjs().year()
		const currentMonth = dayjs().month() + 1
		const startDate: Date = dayjs(`${currentYear}-${currentMonth}-01`).toDate()
		const endDate: Date = dayjs(`${currentYear}-${currentMonth + 1}-01`).toDate()

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

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// 今月の日数
			const dayCount = dayjs().daysInMonth()
			console.log(`days: ${dayCount}`)

			// todosを元にdataを生成
			let data: { day: string, value: number }[] = []

			for (let i = 1; i < dayCount + 1; i++) {

				// この日のTodo達成数
				let achieveCount = 0

				// 全てのTodoを検査し、この日のTodo達成数を取得する
				todos.forEach(todo => {

					// Todo達成日時、この日、この日の次の日の3つのDate
					const achievedAt = todo.achievedAt!
					const currentDay = dayjs(`${currentYear}-${currentMonth}-${i}`).toDate()
					const nextDay = dayjs(`${currentYear}-${currentMonth}-${i + 1}`).toDate()

					// 3つのDateを比較して、達成日時が今日と明日の間かどうか判定
					if (achievedAt >= currentDay && achievedAt < nextDay) {
						achieveCount += 1
					}
				})

				// この日のTodo達成数が取得できたら、配列dataに要素を追加
				data.push({
					day: `${i}日`,
					value: achieveCount
				})
			}

			// Stateを更新
			setData(data)
			setIsLoaded(true)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Fail! Error listening todos. ${error}`)
			setIsLoaded(true)
		})

	}

	useEffect(() => {

		listenTodos()

		return () => {
			if (unsub !== null) unsub()
		}
	})

	return (
		<div className={`bg-white px-4 py-3 rounded-xl dark:bg-zinc-800 ${props.className}`}>
			<p className="text-xl">xxxx年 xx月</p>
			<p className="text-zinc-500">達成したTodo xx</p>

			{!isLoaded &&
				<p className="mt-2">Loading...</p>
			}

			{isLoaded && data === null &&
				<p className="mt-2">読み取りに失敗しました</p>
			}

			{isLoaded && data !== null &&

				<BarChart
					width={300}
					height={300}
					data={data}
					className="mt-2"
				>
					<CartesianGrid stroke="#444" />
					<XAxis dataKey="day" />
					<YAxis width={20} />
					<Bar dataKey="value" fill="#3b82f6" />
				</BarChart>
			}
		</div>
	)
}

export default AchieveCountAtMonthBarChart