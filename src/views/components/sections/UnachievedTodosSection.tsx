import { AiOutlinePlus } from "react-icons/ai"
import NavLinkToModal from "../others/NavLinkToModal"
import { useEffect, useState } from "react"
import Todo from "../../../entities/Todo"
import { query, collection, where, orderBy, limit, onSnapshot } from "firebase/firestore"
import AuthService from "../../../utilities/AuthService"
import { db } from "../../../utilities/firebase"
import TodosList from "../lists/TodosList"

interface Props {
	className?: string
}

function UnachievedTodosSection(props: Props) {

	const [pinnedTodos, setPinnedTodos] = useState<Todo[] | null>(null)
	const [unpinnedTodos, setunpinnedTodos] = useState<Todo[] | null>(null)

	const [isLoadedPinnedTodos, setIsLoadedPinnedTodos] = useState(false)
	const [isLoadedUnpinnedTodos, setIsLoadedUnpinnedTodos] = useState(false)

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
		onSnapshot(q, async (querySnapshot) => {

			// TODO: このコードの意味を調べる
			if (querySnapshot.metadata.hasPendingWrites) return

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				// ドキュメントの各フィールドの値を取り出す
				const id: string = doc.id ?? ""
				const userId: string = doc.data().userId ?? ""

				const content: string = doc.data().content ?? ""
				const order: number = doc.data().order ?? 0
				const isPinned: boolean = doc.data().isPinned ?? false

				const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

				const achievedAtFieldValue = doc.data({ serverTimestamps: "estimate" }).achievedAt
				const achievedAt: Date | null = achievedAtFieldValue === null ? null : achievedAtFieldValue.toDate()

				// 値を使ってTodoオブジェクトを作成
				const todo: Todo = {
					id: id,
					userId: userId,
					content: content,
					order: order,
					isPinned: isPinned,
					createdAt: createdAt,
					achievedAt: achievedAt
				}

				// 配列に追加
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
		onSnapshot(q, async (querySnapshot) => {

			// TODO: このコードの意味を調べる
			if (querySnapshot.metadata.hasPendingWrites) return

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				// ドキュメントの各フィールドの値を取り出す
				const id: string = doc.id ?? ""
				const userId: string = doc.data().userId ?? ""

				const content: string = doc.data().content ?? ""
				const order: number = doc.data().order ?? 0
				const isPinned: boolean = doc.data().isPinned ?? false

				const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

				const achievedAtFieldValue = doc.data({ serverTimestamps: "estimate" }).achievedAt
				const achievedAt: Date | null = achievedAtFieldValue === null ? null : achievedAtFieldValue.toDate()

				// 値を使ってTodoオブジェクトを作成
				const todo: Todo = {
					id: id,
					userId: userId,
					content: content,
					order: order,
					isPinned: isPinned,
					createdAt: createdAt,
					achievedAt: achievedAt
				}

				// 配列に追加
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

		listenPinnedTodos()
		listenUnpinnedTodos()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (

		<div className={props.className}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">Todo</h2>

				<NavLinkToModal to="/new" className="flex gap-1 items-center text-blue-500 hover:opacity-70 transition">

					<AiOutlinePlus className="text-xl" />
					<span>新規Todo</span>
				</NavLinkToModal>
			</div>

			<div>

				{(!isLoadedPinnedTodos || !isLoadedUnpinnedTodos) &&
					<div>
						<p className="mt-4">Loading...</p>
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

								<TodosList todos={pinnedTodos} label="固定済み" />
								<TodosList todos={unpinnedTodos} label="その他" />
							</div>
						}

						{pinnedTodos.length !== 0 && unpinnedTodos.length === 0 &&
							<div>

								<TodosList todos={pinnedTodos} label="固定済み" />
							</div>
						}

						{pinnedTodos.length === 0 && unpinnedTodos.length !== 0 &&
							<div>

								<TodosList todos={unpinnedTodos} />
							</div>
						}
					</div>
				}
			</div>
		</div>
	)
}

export default UnachievedTodosSection