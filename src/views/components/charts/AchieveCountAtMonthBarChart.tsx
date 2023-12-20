import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"
import { Unsubscribe } from "firebase/firestore"
import TodoService from "../../../utils/TodoService"
import ReactLoading from "react-loading"
import ChartRecord from "../../../entities/ChartRecord"
import ChartService from "../../../utils/ChartService"



interface Props {
	offset: number
	className?: string
}



function AchieveCountAtMonthBarChart(props: Props) {

	// Chartにセットするデータ
	const [chartRecords, setChartRecords] = useState<ChartRecord[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// 今月のTodo達成数
	const [achieveCountAtMonth, setAchieveCountAtMonth] = useState<number | null>(null)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onAchievedTodosAtMonthChanged(props.offset, todos => {

				// Todo[]をChartRecord[]に変換
				const chartRecords = ChartService.toMonthChartRecords(todos, props.offset)

				// Stateを更新
				setChartRecords(chartRecords)
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

			{isLoaded && chartRecords === null &&
				<div>
					<p className="mt-2 text-zinc-500">読み取りに失敗しました</p>
				</div>
			}

			{isLoaded && chartRecords !== null &&

				<div>

					<p className="mt-1 text-zinc-500">達成したTodo {achieveCountAtMonth ?? "--"}</p>

					<BarChart
						width={300}
						height={300}
						data={chartRecords}
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