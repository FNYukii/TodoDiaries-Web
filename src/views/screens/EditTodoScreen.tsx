import { useEffect, useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import URLModal from "../components/others/URLModal"
import SubmitButton from "../components/buttons/SubmitButton"
import { BsCalendarCheck, BsCalendarCheckFill, BsFillPinFill, BsPin, BsTrash3 } from "react-icons/bs"
import MyDatePicker from "../components/inputs/MyDatePicker"
import MyTimePicker from "../components/inputs/MyTimePicker"
import { useNavigate, useParams } from "react-router-dom"
import TodoService from "../../utilities/TodoService"
import Todo from "../../entities/Todo"
import StateModal from "../components/others/StateModal"

function EditTodoScreen() {

	document.title = "Todoを編集 - Todo Diaries"

	const { todoId } = useParams()

	const [content, setContent] = useState("")
	const [isPinned, setIsPinned] = useState(false)
	const [achievedAt, setAchievedAt] = useState<Date | null>(null)

	const [oldTodo, setOldTodo] = useState<Todo | null>(null)

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

	useEffect(() => {

		(async () => {

			// 既存Todoを読み取り
			const todo = await TodoService.readTodo(todoId!)

			// 読み取りに失敗したら終了
			if (!todo) {

				alert("IDに該当するTodoがありません")
				return
			}

			// 画面に反映
			setContent(todo.content)
			setIsPinned(todo.isPinned ?? false)
			setAchievedAt(todo.achievedAt)

			// 古いデータを保持しておく
			setOldTodo(todo)
		})()

	}, [todoId])

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {

		event.preventDefault()

		if (!oldTodo) {

			alert("Todoの取得に失敗しているので、データを更新できません。")
			return
		}

		setIsLoading(true)

		const newContent = content
		const newIsPinned = !achievedAt ? isPinned : null

		// 新しいTodoのorderの値を設定していく
		let newOrder: number | null = oldTodo.order

		// 未達成のままで、非固定から固定になった場合
		if (!oldTodo.achievedAt && !achievedAt && oldTodo.isPinned === false && isPinned) {

			const maxOrder = await TodoService.readOrder(true, true)

			if (maxOrder === null) {
				return
			}

			newOrder = maxOrder + 100
		}

		// 未達成のままで、固定から非固定になった場合
		else if (!oldTodo.achievedAt && !achievedAt && oldTodo.isPinned === true && !isPinned) {

			const minOrder = await TodoService.readOrder(false, false)

			if (minOrder === null) {
				return
			}

			newOrder = minOrder - 100
		}

		// 未達成から達成になった場合
		else if (!oldTodo.achievedAt && achievedAt) {
			newOrder = null
		}

		// 達成から未達成に戻し、未固定にする場合
		else if (oldTodo.achievedAt && !achievedAt && !isPinned) {

			const minOrder = await TodoService.readOrder(false, false)

			if (minOrder === null) {
				return
			}

			newOrder = minOrder - 100
		}

		// 達成から未達成に戻し、固定する場合
		else if (oldTodo.achievedAt && !achievedAt && isPinned) {

			const maxOrder = await TodoService.readOrder(true, true)

			if (maxOrder === null) {
				return
			}

			newOrder = maxOrder + 100
		}

		const newAchievedAt = !achievedAt ? null : achievedAt

		// データを更新
		const result = await TodoService.updateTodo(todoId!, newContent, newIsPinned, newOrder, newAchievedAt)

		// 失敗
		if (!result) {

			alert("Todoの更新に失敗しました。")
			setIsLoading(false)

			return
		}

		// 成功
		navigate('/')
	}

	return (

		<URLModal>

			<form onSubmit={(event) => onSubmit(event)}>

				<div className="mx-8">

					<h1 className="mt-4 text-2xl font-bold">Todoを編集</h1>

					<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
				</div>

				<div className="mt-2 mb-7 ml-5 mr-4 flex gap-2 items-center justify-between">

					<div className="flex gap-2 items-center">

						<button type="button" onClick={() => setIsPinned(!isPinned)} disabled={achievedAt !== null} className="p-3 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition disabled:bg-transparent dark:disabled:bg-transparent disabled:text-zinc-300 dark:disabled:text-zinc-700">

							{!isPinned &&
								<BsPin className="text-xl" />
							}

							{isPinned &&
								<BsFillPinFill className="text-xl" />
							}
						</button>

						<button type="button" onClick={() => {

							if (!achievedAt) {
								setAchievedAt(new Date())
								setIsPinned(false)
							}

							else if (achievedAt) {
								setAchievedAt(null)
							}

						}} className="p-3 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">

							{!achievedAt &&
								<BsCalendarCheck className="text-xl" />
							}

							{achievedAt &&
								<BsCalendarCheckFill className="text-xl" />
							}
						</button>

						{achievedAt &&

							<div className="mx-3 flex gap-4">

								<MyDatePicker date={achievedAt} setDate={setAchievedAt} />
								<MyTimePicker date={achievedAt} setDate={setAchievedAt} />
							</div>
						}

						<button type="button" onClick={() => setIsShowDeleteModal(true)} className="p-3 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition">

							<BsTrash3 className="text-xl" />
						</button>

						{isShowDeleteModal &&

							<StateModal
								title="Todoを削除してもよろしいですか?"
								acceptLabel="削除"
								destractiveDialog
								onClose={() => setIsShowDeleteModal(false)}
								onAccept={() => alert("hey")}
							/>
						}
					</div>

					<SubmitButton text="完了" isLoading={isLoading} disabled={content === ""} />
				</div>
			</form>
		</URLModal>
	)
}

export default EditTodoScreen