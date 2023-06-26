import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import AuthService from "./AuthService"
import { db } from "./firebase"

class TodoService {

	static async createTodo(content: string, isPinned: boolean, achievedAt: Date | null): Promise<string | null> {

		// サインインしていないなら終了　
		const uid = AuthService.uid()

		if (uid === null) {
			return null
		}

		// TODO: orderの値を決定
		const order = 100

		// Todoドキュメントを追加
		try {

			const ref = await addDoc(collection(db, "todos"), {
				userId: uid,
				content: content,
				isPinned: isPinned,
				order: order,
				createdAt: serverTimestamp(),
				achievedAt: achievedAt
			})

			return ref.id

		} catch (error) {

			console.log(`Failed to Todo creation. ${error}`)
			return null
		}
	}
}

export default TodoService