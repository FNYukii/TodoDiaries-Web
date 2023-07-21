import { useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import Modal from "../components/others/Modal"
import SubmitButton from "../components/buttons/SubmitButton"
import TodoService from "../../utilities/TodoService"
import { useNavigate } from "react-router-dom"
import DatetimePicker from "../components/inputs/DatetimePicker"
import { BsCalendarCheck, BsCalendarCheckFill, BsFillPinFill, BsPin } from "react-icons/bs"

function CreateTodoScreen() {

	document.title = "新規Todo - Todo Diaries"

	const [content, setContent] = useState("")
	const [isPinned, setIsPinned] = useState(false)
	const [isAchieved, setIsAchieved] = useState(false)
	const [achievedAt, setAchievedAt] = useState<Date>(new Date())

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setIsLoading(true)

		const todoId = await TodoService.createTodo(content, isPinned, null)

		if (!todoId) {
			alert("Todoの作成に失敗しました。")
		}

		if (todoId) {
			navigate("/")
		}

		setIsLoading(false)
	}

	return (

		<Modal>

			<form onSubmit={(event) => onSubmit(event)}>

				<div className="mx-8">

					<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>

					<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" autoFocus />
				</div>

				<div className="mt-2 ml-5 mr-8 flex gap-2 items-center">

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
						<DatetimePicker date={achievedAt} setDate={setAchievedAt} />
					}
				</div>

				<p>achievedAt: {achievedAt.toString()}</p>

				<div className="mt-4 mb-7 mr-4 ml-8 flex justify-end items-center">

					<SubmitButton text="追加" isLoading={isLoading} disabled={content === ""} />
				</div>
			</form>
		</Modal>
	)
}

export default CreateTodoScreen