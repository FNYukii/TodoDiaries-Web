import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"
import { Unsubscribe } from "firebase/firestore"
import TodoService from "../../../utils/TodoService"
import ReactLoading from "react-loading"



interface Props {
	offset: number
	className?: string
}



function AchieveCountAtMonthBarChart(props: Props) {

	// Chartにセットするデータ
	const [data, setData] = useState<{ label: string, value: number }[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// 今月のTodo達成数
	const [achieveCountAtMonth, setAchieveCountAtMonth] = useState<number | null>(null)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onAchievedTodosAtMonthChanged(props.offset, todos => {

				// 今の情報
				const now = dayjs()
				const shiftedNow = now.add(props.offset, 'month')
				const currentYear = shiftedNow.year()
				const currentMonth = shiftedNow.month() + 1

				// 今月の日数
				const dayCount = dayjs().daysInMonth()

				// todosを元にdataを生成
				let data: { label: string, value: number }[] = []

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
						label: `${i}日`,
						value: achieveCount
					})
				}

				// Stateを更新
				setData(data)
				setAchieveCountAtMonth(todos.length)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})

		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [props.offset])



	return (
		<div className={` ${props.className}`}>

			{!isLoaded &&
				<div className="flex justify-center">

					<ReactLoading
						type="spin"
						color="#666"
						height="20px"
						width="20px"
						className="mt-4"
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

					<p className="mt-1 text-zinc-500">達成したTodo {achieveCountAtMonth ?? "--"}</p>

					<BarChart
						width={300}
						height={300}
						data={data}
						className="mt-2"
					>
						<CartesianGrid stroke="#7774" />
						<XAxis dataKey="label" height={16} stroke="#777A" />
						<YAxis width={20} stroke="#777A" domain={[0, (dataMax: number) => (dataMax < 5 ? 5 : dataMax)]} tickCount={6} />
						<Bar dataKey="value" fill="#3b82f6" />
					</BarChart>
				</div>
			}
		</div>
	)
}

export default AchieveCountAtMonthBarChart