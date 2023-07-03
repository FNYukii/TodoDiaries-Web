import { useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import Modal from "../components/others/Modal"
import SubmitButton from "../components/buttons/SubmitButton"
import TodoService from "../../utilities/TodoService"
import { useNavigate } from "react-router-dom"

function CreateTodoScreen() {

	document.title = "新規Todo - Todo Diaries"

	const [content, setContent] = useState("")
	const [isPinned, setIsPinned] = useState(false)
	const [isAchieved, setIsAchieved] = useState(false)
	// const [achievedAt, setAchievedAt] = useState<Date>(new Date())

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

					<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
				</div>

				<div className="mt-4 ml-4 mr-8 flex flex-wrap gap-2 items-center">

					<label id="input-isPinned" className="w-fit py-1 px-4 cursor-pointer flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition">

						<span>固定する</span>
						<input id="input-isPinned" type="checkbox" checked={isPinned} onChange={() => setIsPinned(prevState => !prevState)} className="w-4 h-4 cursor-pointer bg-blue-500 hover:bg-blue-500" />
					</label>

					<label id="input-isAchieved" className="w-fit py-1 px-4 cursor-pointer flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition">

						<span>達成済み</span>
						<input id="input-isAchieved" type="checkbox" checked={isAchieved} onChange={() => setIsAchieved(prevState => !prevState)} className="w-4 h-4 cursor-pointer bg-blue-500 hover:bg-blue-500" />
					</label>

					{isAchieved &&
						<div className="space-x-2">
							<span>達成日時</span>
							<button className="py-1 px-2 bg-gray-200 rounded-md">2023/06/29</button>
							<button className="py-1 px-2 bg-gray-200 rounded-md">12:34</button>
						</div>
					}
				</div>

				<div className="mt-4 mb-7 mr-4 ml-8 flex justify-end items-center">

					<SubmitButton text="追加" isLoading={isLoading} disabled={content === ""} />
				</div>
			</form>
		</Modal>
	)
}

export default CreateTodoScreen