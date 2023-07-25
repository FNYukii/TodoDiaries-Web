import { useEffect, useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import Modal from "../components/others/Modal"
import SubmitButton from "../components/buttons/SubmitButton"
import { BsCalendarCheck, BsCalendarCheckFill, BsFillPinFill, BsPin } from "react-icons/bs"
import MyDatePicker from "../components/inputs/MyDatePicker"
import MyTimePicker from "../components/inputs/MyTimePicker"
import { useParams } from "react-router-dom"
import TodoService from "../../utilities/TodoService"

function EditTodoScreen() {

	document.title = "Todoを編集 - Todo Diaries"

	const { todoId } = useParams()

	const [content, setContent] = useState("")
	const [isPinned, setIsPinned] = useState(false)
	const [isAchieved, setIsAchieved] = useState(false)
	const [achievedAt, setAchievedAt] = useState<Date>(new Date())

	const [isLoading, setIsLoading] = useState(false)
	
	useEffect(() => {

		(async () => {

			// 既存Todoを読み取り
			const todo = await TodoService.readTodo(todoId!)

			// 読み取りに失敗したら終了
			if (!todo) {
				return
			}

			// 画面に反映
			setContent(todo.content)
			setIsPinned(todo.isPinned)
			setIsAchieved(todo.achievedAt !== null)
			setAchievedAt(todo.achievedAt ?? new Date())
		})()
		
	}, [todoId])

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setIsLoading(true)

		// データを更新

		setIsLoading(false)
	}

	return (

		<Modal>

			<form onSubmit={(event) => onSubmit(event)}>

				<div className="mx-8">

					<h1 className="mt-4 text-2xl font-bold">Todoを編集</h1>

					<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" autoFocus />
				</div>

				<div className="mt-2 mb-7 ml-5 mr-4 flex gap-2 items-center justify-between">

					<div className="flex gap-2 items-center">

						<button type="button" onClick={() => setIsPinned(!isPinned)} className="p-3 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">

							{!isPinned &&
								<BsPin className="text-xl" />
							}

							{isPinned &&
								<BsFillPinFill className="text-xl" />
							}
						</button>

						<button type="button" onClick={() => setIsAchieved(!isAchieved)} className="p-3 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">

							{!isAchieved &&
								<BsCalendarCheck className="text-xl" />
							}

							{isAchieved &&
								<BsCalendarCheckFill className="text-xl" />
							}
						</button>

						{isAchieved &&

							<div className="ml-3 flex gap-4">

								<MyDatePicker date={achievedAt} setDate={setAchievedAt} />
								<MyTimePicker date={achievedAt} setDate={setAchievedAt} />
							</div>
						}
					</div>

					<SubmitButton text="更新" isLoading={isLoading} disabled={content === ""} />
				</div>
			</form>
		</Modal>
	)
}

export default EditTodoScreen