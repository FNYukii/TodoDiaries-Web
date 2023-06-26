import { useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import Modal from "../components/others/Modal"
import SubmitButton from "../components/buttons/SubmitButton"

function CreateTodoScreen() {

	document.title = "新規Todo - Todo Diaries"

	const [content, setContent] = useState("")
	// eslint-disable-next-line 
	const [isLoading, setIsLoading] = useState(false)

	return (

		<Modal>

			<div className="mx-8">

				<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>

				<DynamicTextarea value={content} setValue={setContent} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
			</div>

			<div className="mt-4 ml-4 mr-8 flex gap-4">

				<label id="input-isPinned" className="w-fit py-1 px-4 cursor-pointer flex items-center gap-2 hover:bg-zinc-100 rounded-full transition">

					<span>固定する</span>
					<input id="input-isPinned" type="checkbox" className="w-4 h-4 cursor-pointer bg-blue-500 hover:bg-blue-500" />
				</label>

				<label id="input-isAchieved" className="w-fit py-1 px-4 cursor-pointer flex items-center gap-2 hover:bg-zinc-100 rounded-full transition">

					<span>達成済み</span>
					<input id="input-isAchieved" type="checkbox" className="w-4 h-4 cursor-pointer bg-blue-500 hover:bg-blue-500" />
				</label>
			</div>

			<div className="mt-4 mb-7 mr-4 ml-8 flex justify-end items-center">

				<SubmitButton text="追加" isLoading={isLoading} disabled={content === ""} />
			</div>
		</Modal>
	)
}

export default CreateTodoScreen