import { query, collection, where, orderBy, limit, onSnapshot, Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import Todo from "../../../entities/Todo"
import AuthService from "../../../utilities/AuthService"
import { db } from "../../../utilities/firebase"
import TodoList from "../lists/TodoList"
import dayjs from "dayjs"
import 'dayjs/locale/ja'
import ReactLoading from "react-loading"
import TodoService from "../../../utilities/TodoService"

interface Props {
	className?: string
}

function SecondColumn(props: Props) {

	dayjs.locale('ja')

	// Todo格納用
	const [groupedTodos, setGroupedTodos] = useState<Todo[][] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// リスナーをデタッチするメソッド
	let unsub: Unsubscribe | null = null

	// 読み取り上限数
	const [readLimit, setReadLimit] = useState(50)

	async function listenTodos() {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("Fail! Error listening todos. 未ログイン状態です。")
			setIsLoaded(true)
			return
		}

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			where("achievedAt", "!=", null),
			orderBy("achievedAt", "desc"),
			limit(readLimit)
		)

		// リアルタイムリスナーを設定
		unsub = onSnapshot(q, async (querySnapshot) => {

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// 配列todosを二次元配列groupedTodosに変換
			let groupedTodos: Todo[][] = []
			let beforeAchievedDay: string | null = null
			let dayCounter = 0
			todos.forEach(todo => {

				// このTodoの達成日を取得
				const currentAchievedDay = dayjs(todo.achievedAt!).format('YYYYMMDD')

				// 初回ループ
				if (beforeAchievedDay === null) {
					groupedTodos.push([])
				}

				// 初回ループでない & 前回と達成日が違うならdayCounterをインクリメント
				else if (beforeAchievedDay !== null && beforeAchievedDay !== currentAchievedDay) {

					dayCounter += 1
					groupedTodos.push([])
				}

				// 二次元配列にTodoを追加
				groupedTodos[dayCounter].push(todo)

				// 今回の達成日を前回の達成日にする
				beforeAchievedDay = currentAchievedDay
			})

			// Stateを更新
			setGroupedTodos(groupedTodos)
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
			if (unsub !== null) {
				unsub()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {

		// 既存リスナーデタッチ
		if (unsub) unsub()

		// 新リスナー設定
		listenTodos()

		// eslint-disable-next-line
	}, [readLimit])

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
						<p className="mt-4">Failed reading todos</p>
					</div>
				}

				{isLoaded && groupedTodos !== null && groupedTodos.length === 0 &&
					<div>
						<p className="mt-4">There is no todo</p>
					</div>
				}

				{isLoaded && groupedTodos !== null && groupedTodos.length !== 0 &&
					<div>

						<div>
							{groupedTodos.map((todos, index) => (

								<div key={index}>

									<TodoList todos={todos} label={dayjs(todos[0].achievedAt).format('YYYY年 M月 D日 ddd曜日')} />
								</div>
							))}
						</div>

						<div className="mt-4 flex justify-center">

							<button onClick={() => {
								
								// 上限緩和
								setReadLimit((prevValue) => prevValue + 50)

							}} className="py-1 px-4 text-blue-500 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50">もっと読み込む</button>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default SecondColumn