import { useState } from "react"
import DynamicTextarea from "../components/inputs/DynamicTextarea"
import Modal from "../components/others/Modal"

function CreateTodoScreen() {

	document.title = "新規Todo - Todo Diaries"

	const [text, setText] = useState("")

	return (

		<Modal>

			<div className="px-8 pb-7">

				<h1 className="mt-4 text-2xl font-bold">新規Todo</h1>

				<DynamicTextarea value={text} setValue={setText} placeholder="やること" className="mt-4 w-full py-2 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
			</div>
		</Modal>
	)
}

export default CreateTodoScreen