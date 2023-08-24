import { useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import URLModal from "../components/others/URLModal"
import SubmitButton from "../components/buttons/SubmitButton"
import TodoService from "../../utilities/TodoService"
import { useNavigate } from "react-router-dom"
import { BsCalendarCheck, BsCalendarCheckFill, BsFillPinFill, BsPin } from "react-icons/bs"
import MyDatePicker from "../components/inputs/MyDatePicker"
import MyTimePicker from "../components/inputs/MyTimePicker"

function CreateTodoScreen() {

	document.title = "新規Todo - Todo Diaries"

	const [content, setContent] = useState("")
	const [isPinned, setIsPinned] = useState(false)
	const [achievedAt, setAchievedAt] = useState<Date | null>(null)

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setIsLoading(true)

		const todoId = !achievedAt ? await TodoService.createUnachievedTodo(content, isPinned) : await TodoService.createAchievedTodo(content, achievedAt)

		if (!todoId) {
			alert("Todoの作成に失敗しました。")
		}

		if (todoId) {
			navigate("/")
		}

		setIsLoading(false)
	}

	return (

		<URLModal>

			<form onSubmit={(event) => onSubmit(event)} className="pb-5">

				<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>

				<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" autoFocus />

				<div className="mt-1 flex gap-2 items-center justify-between">

					<div className="flex gap-2 items-center">

						<button type="button" onClick={() => setIsPinned(!isPinned)} disabled={achievedAt !== null} className="ml-negative-3 p-3 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition disabled:bg-transparent dark:disabled:bg-transparent disabled:text-zinc-300 dark:disabled:text-zinc-700">

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

							<div className="ml-3 flex gap-4">

								<MyDatePicker date={achievedAt} setDate={setAchievedAt} />
								<MyTimePicker date={achievedAt} setDate={setAchievedAt} />
							</div>
						}
					</div>

					<SubmitButton text="作成" isLoading={isLoading} disabled={content === ""} className="mr-negative-4"/>
				</div>
			</form>
		</URLModal>
	)
}

export default CreateTodoScreen