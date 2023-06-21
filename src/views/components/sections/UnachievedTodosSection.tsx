import { AiOutlinePlus } from "react-icons/ai"
import UnachievedTodosList from "../lists/UnachievedTodosList"

interface Props {
	className?: string
}

function UnachievedTodosSection(props: Props) {

	return (

		<section className={props.className}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">Todo</h2>

				<button className="flex gap-1 items-center text-blue-500 hover:opacity-70 transition">
					
					<AiOutlinePlus className="text-xl"/>
					<span>新規Todo</span>
				</button>
			</div>

			<section className="mt-4">

				<span className="text-zinc-500">固定済み</span>

				<UnachievedTodosList pinned className="mt-2" />
			</section>

			<section className="mt-6">

				<span className="text-zinc-500">その他</span>

				<UnachievedTodosList className="mt-2" />
			</section>
		</section>
	)
}

export default UnachievedTodosSection