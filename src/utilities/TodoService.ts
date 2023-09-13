import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDocFromCache, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import AuthService from "./AuthService"
import { db } from "./firebase"
import Todo from "../entities/Todo"

class TodoService {

	static toTodo(from: QueryDocumentSnapshot<DocumentData>): Todo {

		const doc = from

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

		return todo
	}

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

	static async readOrder(isPinned: boolean, maxOrder: boolean): Promise<number | null> {

		// サインインしていないなら終了　
		const uid = await AuthService.uid()

		if (uid === null) {

			console.log('Fail! uidを取得できません')
			return null
		}

		// クエリを用意
		const q = query(
			collection(db, "todos"),
			where("userId", "==", uid),
			where("achievedAt", "==", null),
			where("isPinned", "==", isPinned),
			orderBy("order", maxOrder ? "desc" : "asc"),
			limit(1)
		)

		try {

			// サーバーorキャッシュから読み取り
			const querySnapshot = await getDocs(q)

			// 成功
			// orderの最大値/最小値を取得する
			let firstOrder: number = 0

			if (querySnapshot.docs.length === 0) {
				firstOrder = 0
			}

			if (querySnapshot.docs.length !== 0) {
				firstOrder = querySnapshot.docs[0].data().order
			}

			return firstOrder

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
		const maxOrder = await this.readOrder(isPinned, true)

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

	static async updateTodo(todoId: string, content: string, isPinned: boolean | null, order: number | null, achievedAt: Date | null): Promise<string | null> {

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
				order: order,
				isPinned: isPinned,
				achievedAt: achievedAt
			})

			return todoId

		} catch (error) {

			console.log(`Fail! Error to update todo. ${error}`)
			return null
		}
	}

	static async updateTodoOrder(todoId: string, order: number): Promise<string | null> {

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
				order: order
			})

			return todoId

		} catch (error) {

			console.log(`Fail! Error to update todo. ${error}`)
			return null
		}
	}

	static async moveTodo(todos: Todo[], from: number, destination: number): Promise<string | null> {

		console.log(`${from} -> ${destination}`)

		// 移動しないなら終了
		if (from === destination) {
			return null
		}

		// 以下、newOrderの値を決めていく処理
		let newOrder = 0.0

		// Todoを上に移動する場合
		if (from > destination) {

			// もしリストの先頭に移動するなら、newOrderはorder最小値-100とする
			if (destination === 0) {
				const minOrder = todos.at(0)!.order!
				newOrder = minOrder - 100
			}

			// もしリストの先頭以外に移動するなら、newOrderは移動先の前後のTodoのorderの中間値とする
			if (destination !== 0) {
				const prevOrder = todos.at(destination - 1)!.order!
				const nextOrder = todos.at(destination + 1)!.order!
				newOrder = (prevOrder + nextOrder) / 2
			}
		}

		// Todoを下に移動する場合
		if (from < destination) {

			// もしリストの末尾に移動するなら、newOrderはorder最大値+100とする
			if (destination === todos.length - 1) {
				const maxOrder = todos.at(-1)!.order!
				newOrder = maxOrder + 100
			}

			// もしリストの末尾以外に移動するなら、newOrderは移動先の前後のTodoのorderの中間値とする
			if (destination !== todos.length - 1) {
				const prevOrder = todos.at(destination - 1)!.order!
				const nextOrder = todos.at(destination + 1)!.order!
				newOrder = (prevOrder + nextOrder) / 2
			}
		}

		// order更新
		const targetTodo = todos.at(from)!
		const result = await this.updateTodoOrder(targetTodo.id, newOrder)

		if (result == null) {
			return null
		}

		return result
	}

	static async deleteTodo(todoId: string): Promise<string | null> {

		return deleteDoc(doc(db, "todos", todoId))
			.then(() => {

				return todoId
			})
			.catch((error) => {

				console.log(`Fail! Error deleting todo. ${error}`)
				return null
			})
	}
}

export default TodoService