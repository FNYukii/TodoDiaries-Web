import { DocumentData, QueryDocumentSnapshot, Unsubscribe, addDoc, collection, deleteDoc, doc, endAt, getDocFromCache, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, startAt, updateDoc, where } from "firebase/firestore"
import AuthService from "./AuthService"
import { db } from "./firebase"
import Todo from "../entities/Todo"
import dayjs from "dayjs"

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
			console.log(`SUCCESS! Read 1 Todo from cache.`)

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

			console.log("FAIL! Error reading todo.", e)
		}

		return null
	}



	static async readOrder(isPinned: boolean, maxOrder: boolean): Promise<number | null> {

		// サインインしていないなら終了　
		const uid = await AuthService.uid()

		if (uid === null) {

			console.log('FAIL! uidを取得できません')
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
			console.log(`SUCCESS! Read 1 Todo.`)

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
			console.log(`FAIL! Todo reading failed. ${error}`)
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
			console.log(`SUCCESS! Created 1 Todo.`)

			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to Todo creation. ${error}`)
			return null
		}
	}



	static async onUnachievedTodosChanged(
		isPinned: boolean,
		callback: (payments: Todo[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("achievedAt", "==", null),
			where("isPinned", "==", isPinned),
			where("userId", "==", userId),
			orderBy("order", "asc"),
			limit(100)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			// Stateを更新
			callback(todos)

		}, (error) => {

			// エラーならログ出力 & State更新
			console.log(`FAIL! Error listening todos. ${error}`)
			cancelCallback(error)
		})
	}



	static async onAchievedTodosChanged(
		readLimit: number,
		callback: (todos: Todo[][]) => unknown,
		cancelCallback: (error: Error) => unknown
	): Promise<Unsubscribe> {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			where("achievedAt", "!=", null),
			orderBy("achievedAt", "desc"),
			limit(readLimit)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

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

			callback(groupedTodos)

		}, (error) => {

			console.log(`Fail! Error listening todos. ${error}`)
			cancelCallback(error)
		})
	}



	static async onAchievedTodosAtMonthChanged(
		offset: number,
		callback: (todos: Todo[]) => unknown,
		cancelCallback: (error: Error) => unknown
	): Promise<Unsubscribe> {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 今月の開始日時と来月の開始日時を取得
		const now = dayjs()
		const shiftedNow = now.add(offset, 'month')
		const currentYear = shiftedNow.year()
		const currentMonth = shiftedNow.month() + 1
		const startDate: Date = dayjs(`${currentYear}-${currentMonth}-01`).toDate()
		const endDate: Date = dayjs(`${currentYear}-${currentMonth + 1}-01`).toDate()

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			orderBy("achievedAt", "asc"),
			startAt(startDate),
			endAt(endDate),
			limit(1000)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			callback(todos)

		}, (error) => {

			console.log(`FAIL! Error listening todos. ${error}`)
			cancelCallback(error)
		})
	}



	static async onAchievedTodosAt2DaysChanged(
		callback: (todos: Todo[]) => unknown,
		cancelCallback: (error: Error) => unknown
	): Promise<Unsubscribe> {

		// UserIDを取得
		const userId = await AuthService.uid()

		// 昨日の開始日時と明日の開始日時を取得
		const now = dayjs()
		const startDate: Date = dayjs(`${now.year()}-${now.month() + 1}-${now.date() - 1}`).toDate()
		const endDate: Date = dayjs(`${now.year()}-${now.month() + 1}-${now.date() + 1}`).toDate()

		// 読み取りクエリを作成
		const q = query(
			collection(db, "todos"),
			where("userId", "==", userId),
			orderBy("achievedAt", "asc"),
			startAt(startDate),
			endAt(endDate),
			limit(1000)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} todos.`)

			// Todoの配列を作成
			let todos: Todo[] = []
			querySnapshot.forEach((doc) => {

				const todo = TodoService.toTodo(doc)
				todos.push(todo)
			})

			callback(todos)

		}, (error) => {

			// 失敗
			console.log(`FAIL! Error listening todos. ${error}`)
			cancelCallback(error)
		})
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
			console.log(`SUCCESS! Created 1 Todo.`)

			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to Todo creation. ${error}`)
			return null
		}
	}



	static async updateTodo(
		todoId: string,
		content: string,
		isPinned: boolean | null,
		order: number | null,
		achievedAt: Date | null
	): Promise<string | null> {

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
			console.log(`SUCCESS! Updated 1 Todo.`)

			return todoId

		} catch (error) {

			console.log(`FAIL! Error to update todo. ${error}`)
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
			console.log(`SUCCESS! Updated 1 Todo.`)

			return todoId

		} catch (error) {

			console.log(`FAIL! Error to update todo. ${error}`)
			return null
		}
	}



	static async moveTodo(todos: Todo[], from: number, destination: number): Promise<string | null> {

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
				newOrder = minOrder - 100.0
			}

			// もしリストの先頭以外に移動するなら、newOrderは移動先の前後のTodoのorderの中間値とする
			if (destination !== 0) {
				const prevOrder = todos.at(destination - 1)!.order!
				const nextOrder = todos.at(destination)!.order!
				newOrder = (prevOrder + nextOrder) / 2.0
			}
		}

		// Todoを下に移動する場合
		if (from < destination) {

			// もしリストの末尾に移動するなら、newOrderはorder最大値+100とする
			if (destination === todos.length - 1) {
				const maxOrder = todos.at(-1)!.order!
				newOrder = maxOrder + 100.0
			}

			// もしリストの末尾以外に移動するなら、newOrderは移動先の前後のTodoのorderの中間値とする
			if (destination !== todos.length - 1) {
				const prevOrder = todos.at(destination)!.order!
				const nextOrder = todos.at(destination + 1)!.order!
				newOrder = (prevOrder + nextOrder) / 2.0
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

				console.log(`SUCCESS! Deleted 1 Todo.`)

				return todoId
			})
			.catch((error) => {

				console.log(`FAIL! Error deleting todo. ${error}`)
				return null
			})
	}
}

export default TodoService