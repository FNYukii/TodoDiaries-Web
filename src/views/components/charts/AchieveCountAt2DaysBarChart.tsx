import dayjs from "dayjs"
import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import ReactLoading from "react-loading"
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"
import AuthService from "../../../utilities/AuthService"

interface Props {
	className?: string
}

function AchieveCountAt2DaysBarChart(props: Props) {

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

			console.log("FAIL! Error listening todos. 未ログイン状態です。")
			setIsLoaded(true)
			return
		}

		
	}

	useEffect(() => {

		listenTodos()

		return () => {
			if (unsub !== null) unsub()
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div className={`bg-white px-4 pt-3 pb-1 rounded-xl dark:bg-zinc-800 ${props.className}`}>

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

					<BarChart
						width={300}
						height={300}
						data={data}
						className="mt-2"
					>
						<CartesianGrid stroke="#7774" />
						<XAxis dataKey="day" stroke="#777A" />
						<YAxis width={20} stroke="#777A" />
						<Bar dataKey="value" fill="#3b82f6" />
					</BarChart>
				</div>

			}
		</div>
	)
}

export default AchieveCountAt2DaysBarChart