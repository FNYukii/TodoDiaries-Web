import { FieldValue, addDoc, collection, doc, getDocFromCache, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import AuthService from "./AuthService"
import { db } from "./firebase"
import Todo from "../entities/Todo"

class TodoService {

	static async readTodo(todoId: string): Promise<Todo | null> {

		const docRef = doc(db, "todos", todoId)

		try {

			// データ読み取り
			const doc = await getDocFromCache(docRef)

			// フィールドの値を取得
			const id: string = doc.id ?? ""
			const userId: string = doc.get('userId') ?? ""
			const content: string = doc.get('content') ?? ""
			const order: number = doc.get('order') ?? 0
			const isPinned: boolean = doc.get('isPinned') ?? false
			const createdAt: Date = doc.get('createdAt').toDate() ?? new Date()
			const achievedAtFieldValue = doc.get('achievedAt')
			const achievedAt: Date | null = achievedAtFieldValue === null ? null : achievedAtFieldValue.toDate()

			// Todoオブジェクトを生成
			const todo: Todo = {
				id: id,
				userId: userId,
				content: content,
				order: order,
				isPinned: isPinned,
				createdAt: createdAt,
				achievedAt: achievedAt
			}

			return todo

		} catch (e) {

			console.log("Fail! Error reading todo.", e)
		}

		return null
	}

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

	static async createUnachievedTodo(content: string, isPinned: boolean): Promise<string | null> {

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
		const order: number | null = maxOrder + 100

		// Todoドキュメントを追加
		try {

			const ref = await addDoc(collection(db, "todos"), {
				userId: uid,
				content: content,
				isPinned: isPinned,
				order: order,
				createdAt: serverTimestamp(),
				achievedAt: null
			})

			return ref.id

		} catch (error) {

			console.log(`Failed to Todo creation. ${error}`)
			return null
		}
	}

	static async createAchievedTodo(content: string, achievedAt: Date): Promise<string | null> {

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

		// Todoドキュメントを追加
		try {

			const ref = await addDoc(collection(db, "todos"), {
				userId: uid,
				content: content,
				isPinned: false,
				order: null,
				createdAt: serverTimestamp(),
				achievedAt: achievedAt
			})

			return ref.id

		} catch (error) {

			console.log(`Failed to Todo creation. ${error}`)
			return null
		}
	}

	static async updateTodo(todoId: string, content: string, achievedAt: Date | null): Promise<string | null> {

		// UserIdを取得
		const uid = await AuthService.uid()

		// サインインしていないなら終了　
		if (uid === null) {
			return null
		}

		// Firestoreのドキュメントへの参照を取得
		const todoRef = doc(db, "todos", todoId)
		
		// Todoを編集
		try {

			await updateDoc(todoRef, {
				content: content,
				order: achievedAt === null ? FieldValue : null,
				isPinned: achievedAt === null ? FieldValue : null,
				achievedAt: achievedAt
			})

			return todoId

		} catch (error) {

			console.log(`Fail! Error to update todo. ${error}`)
			return null
		}
	}
}

export default TodoService