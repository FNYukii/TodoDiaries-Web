import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import AuthService from "./AuthService"
import { db } from "./firebase"

class TodoService {

	static async readMaxOrder(isPinned: boolean): Promise<number | null> {

		// サインインしていないなら終了　
		const uid = await AuthService.uid()

		if (uid === null) {
			return null
		}

		// クエリを用意
		const q = query(
			collection(db, "todos"),
			where("userId", "==", uid),
			where("achievedAt", "==", null),
			where("isPinned", "==", isPinned),
			orderBy("order", "desc"),
			limit(1)
		)

		try {

			// サーバーorキャッシュから読み取り
			const querySnapshot = await getDocs(q)
			
			// 成功
			// orderの最大値を取得する
			let maxOrder: number = 0

			if (querySnapshot.docs.length === 0) {
				maxOrder = 0
			}

			if (querySnapshot.docs.length !== 0) {
				maxOrder = querySnapshot.docs[0].data().order
			}

			return maxOrder

		} catch (error) {

			// 失敗
			console.log(`Fail! Todo reading failed. ${error}`)
			return null
		}
	}

	static async createTodo(content: string, isPinned: boolean, achievedAt: Date | null): Promise<string | null> {

		// UserIdを取得
		const uid = await AuthService.uid()

		// サインインしていないなら終了　
		if (uid === null) {
			return null
		}

		// contentが空なら終了
		if (content.length === 0 || content.length > 100) {
			return null
		}

		// 現在のorderの最大値を取得
		const maxOrder = await this.readMaxOrder(isPinned)

		// 取得できなければ終了
		if (maxOrder === null) {
			return null
		}

		// 新しいTodoのorderの値を決める
		const order: number | null = achievedAt === null ? maxOrder + 100 : null

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