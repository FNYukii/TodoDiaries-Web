import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import ReactLoading from "react-loading"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from "recharts"
import TodoService from "../../../utils/TodoService"
import { useMediaQuery } from "@mui/material"
import ChartRecord from "../../../entities/ChartRecord"
import ChartService from "../../../utils/ChartService"

interface Props {
	className?: string
}

function AchieveCountAt2DaysBarChart(props: Props) {

	// Chartにセットするデータ
	const [chartRecords, setChartRecords] = useState<ChartRecord[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onAchievedTodosAt2DaysChanged(todos => {

				// Todo[]をChartRecord[]に変換
				const chartRecords = ChartService.to2DaysChartRecords(todos)

				// Stateを更新
				setChartRecords(chartRecords)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})

		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [])



	const isLightMode = useMediaQuery('(prefers-color-scheme: dark)')



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

			{isLoaded && chartRecords === null &&
			
				<div>
					<p className="mt-2 text-zinc-500">読み取りに失敗しました</p>
				</div>
			}

			{isLoaded && chartRecords !== null &&

				<div>

					{chartRecords[0].value > chartRecords[1].value &&
						<p>今日のTodo達成数は昨日よりも多いです。</p>
					}

					{chartRecords[0].value < chartRecords[1].value &&
						<p>今日のTodo達成数は昨日よりも少ないです。</p>
					}

					{chartRecords[0].value === chartRecords[1].value &&
						<p>今日のTodo達成数は昨日と同じです。</p>
					}

					<BarChart
						width={300}
						height={200}
						data={chartRecords}
						layout="vertical"
						className="mt-2"
					>
						<CartesianGrid stroke="#7774" />

						<XAxis type="number" stroke="#777A" domain={[0, (dataMax: number) => (dataMax < 5 ? 5 : dataMax)]} tickCount={6} />
						<YAxis type="category" dataKey="label" width={34} stroke="#777A" />

						<Bar dataKey="value" barSize={30} >

							{
								chartRecords.map((entry, index) => (
									<Cell key={index} fill={index === 0 ? "#3b82f6" : `${isLightMode ? "#555" : "#aaa"}`} />
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