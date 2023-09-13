import { AiOutlinePlus } from "react-icons/ai"
import NavLinkToModal from "../others/NavLinkToModal"
import { useEffect, useState } from "react"
import Todo from "../../../entities/Todo"
import { query, collection, where, orderBy, limit, onSnapshot, Unsubscribe } from "firebase/firestore"
import AuthService from "../../../utilities/AuthService"
import { db } from "../../../utilities/firebase"
import ReactLoading from "react-loading"
import { useNavigate } from "react-router-dom"
import TodoService from "../../../utilities/TodoService"
import SortableTodoList from "../lists/SortableTodoList"

interface Props {
	className?: string
}

function FirstColumn(props: Props) {

	const [pinnedTodos, setPinnedTodos] = useState<Todo[] | null>(null)
	const [unpinnedTodos, setunpinnedTodos] = useState<Todo[] | null>(null)
	let unsubPinnedTodos: Unsubscribe | null = null


	const [isLoadedPinnedTodos, setIsLoadedPinnedTodos] = useState(false)
	const [isLoadedUnpinnedTodos, setIsLoadedUnpinnedTodos] = useState(false)
	let unsubUnpinnedTodos: Unsubscribe | null = null

	async function listenPinnedTodos() {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("Fail! Error listening todos. 未ログイン状態です。")
			setIsLoadedPinnedTodos(true)
			return
		}

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("achievedAt", "==", null),
			where("isPinned", "==", true),
			where("userId", "==", userId),
			orderBy("order", "asc"),
			limit(100)
		)

		// リアルタイムリスナーを設定
		unsubPinnedTodos = onSnapshot(q, async (querySnapshot) => {

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// Stateを更新
			setPinnedTodos(todos)
			setIsLoadedPinnedTodos(true)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Fail! Error listening todos. ${error}`)
			setIsLoadedPinnedTodos(true)
		})
	}

	async function listenUnpinnedTodos() {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 未ログインなら、エラーとする
		if (userId === null) {

			console.log("Fail! Error listening todos. 未ログイン状態です。")
			setIsLoadedUnpinnedTodos(true)
			return
		}

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("achievedAt", "==", null),
			where("isPinned", "==", false),
			where("userId", "==", userId),
			orderBy("order", "asc"),
			limit(100)
		)

		// リアルタイムリスナーを設定
		unsubUnpinnedTodos = onSnapshot(q, async (querySnapshot) => {

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// Stateを更新
			setunpinnedTodos(todos)
			setIsLoadedUnpinnedTodos(true)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Fail! Error listening todos. ${error}`)
			setIsLoadedUnpinnedTodos(true)
		})
	}

	useEffect(() => {

		// リスナーを設定
		listenPinnedTodos()
		listenUnpinnedTodos()

		return () => {

			// リスナーをデタッチ
			if (unsubPinnedTodos !== null) {
				unsubPinnedTodos()
			}

			if (unsubUnpinnedTodos !== null) {
				unsubUnpinnedTodos()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// キーボードショートカット用
	const navigate = useNavigate()

	function onKeyUp(event: KeyboardEvent) {
		if (event.key === 'n') {
			navigate('/new')
		}
	}

	useEffect(() => {

		document.addEventListener("keyup", onKeyUp, false)
		return () => {
			document.removeEventListener("keyup", onKeyUp, false)
		}
		// eslint-disable-next-line
	}, [])

	return (

		<div className={props.className}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">Todo</h2>

				<NavLinkToModal to="/new" className="mr-negative-4 py-1 px-4 flex gap-1 items-center text-blue-500 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50">

					<AiOutlinePlus className="text-xl" />
					<span>新規Todo</span>
				</NavLinkToModal>
			</div>

			<div>

				{(!isLoadedPinnedTodos || !isLoadedUnpinnedTodos) &&
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

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && (pinnedTodos === null || unpinnedTodos === null) &&
					<div>
						<p className="mt-4">Failed reading todos</p>
					</div>
				}

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && pinnedTodos !== null && unpinnedTodos !== null && pinnedTodos.length === 0 && unpinnedTodos.length === 0 &&
					<div>
						<p className="mt-4">There is no todo</p>
					</div>
				}

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && pinnedTodos !== null && unpinnedTodos !== null && (pinnedTodos.length !== 0 || unpinnedTodos.length !== 0) &&
					<div>

						{pinnedTodos.length !== 0 && unpinnedTodos.length !== 0 &&
							<div>

								<SortableTodoList todos={pinnedTodos} label="固定済み" />
								<SortableTodoList todos={unpinnedTodos} label="その他" />
							</div>
						}

						{pinnedTodos.length !== 0 && unpinnedTodos.length === 0 &&
							<div>

								<SortableTodoList todos={pinnedTodos} label="固定済み" />
							</div>
						}

						{pinnedTodos.length === 0 && unpinnedTodos.length !== 0 &&
							<div>

								<SortableTodoList todos={unpinnedTodos} />
							</div>
						}
					</div>
				}
			</div>
		</div>
	)
}

export default FirstColumn