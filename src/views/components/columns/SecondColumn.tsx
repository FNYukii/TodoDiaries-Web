import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import Todo from "../../../entities/Todo"
import AchievedTodoList from "../lists/AchievedTodoList"
import dayjs from "dayjs"
import 'dayjs/locale/ja'
import ReactLoading from "react-loading"
import TodoService from "../../../utils/TodoService"

interface Props {
	className?: string
}

function SecondColumn(props: Props) {

	dayjs.locale('ja')

	// Todo格納用
	const [groupedTodos, setGroupedTodos] = useState<Todo[][] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// 読み取り上限数
	const [limit, setLimit] = useState(50)



	// 読み取りリスナーを設定
	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onAchievedTodosChanged(limit, todos => {

				setGroupedTodos(todos)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})

		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [limit])



	return (

		<div className={props.className}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">達成済み</h2>
			</div>

			<div>

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

				{isLoaded && groupedTodos === null &&
					<div>
						<p className="mt-4 text-zinc-500">読み取りに失敗しました</p>
					</div>
				}

				{isLoaded && groupedTodos !== null && groupedTodos.length === 0 &&
					<div>
						<p className="mt-4 text-zinc-500">達成済みのTodoはありません</p>
					</div>
				}

				{isLoaded && groupedTodos !== null && groupedTodos.length !== 0 &&
					<div>

						<div>
							{groupedTodos.map((todos, index) => (

								<div key={index}>

									<AchievedTodoList todos={todos} label={dayjs(todos[0].achievedAt).format('YYYY年 M月 D日 ddd曜日')} />
								</div>
							))}
						</div>

						<div className="mt-4 flex justify-center">

							<button onClick={() => {

								// 上限緩和
								setLimit((prevValue) => prevValue + 50)

							}} className="py-1 px-4 text-blue-500 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50">もっと読み込む</button>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default SecondColumn