import { query, collection, where, orderBy, limit, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import Todo from "../../../entities/Todo"
import AuthService from "../../../utilities/AuthService"
import { db } from "../../../utilities/firebase"
import TodosList from "../lists/TodosList"

interface Props {
	className?: string
}

function AchievedTodosSection(props: Props) {

	const [todos, setTodos] = useState<Todo[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	async function listenPinnedTodos() {

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
			limit(10)
		)

		// リアルタイムリスナーを設定
		onSnapshot(q, async (querySnapshot) => {

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
			setTodos(todos)
			setIsLoaded(true)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`Fail! Error listening todos. ${error}`)
			setIsLoaded(true)
		})
	}

	useEffect(() => {

		listenPinnedTodos()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (

		<div className={props.className}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">達成済み</h2>
			</div>

			<div>

				{!isLoaded &&
					<div>
						<p className="mt-4">Loading...</p>
					</div>
				}

				{isLoaded && todos === null &&
					<div>
						<p className="mt-4">Failed reading todos</p>
					</div>
				}

				{isLoaded && todos !== null && todos.length === 0 &&
					<div>
						<p className="mt-4">There is no todo</p>
					</div>
				}

				{isLoaded && todos !== null && todos.length !== 0 &&
					<div>

						<TodosList todos={todos} />
					</div>
				}
			</div>
		</div>
	)
}

export default AchievedTodosSection