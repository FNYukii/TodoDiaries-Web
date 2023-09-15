import dayjs from "dayjs"
import Todo from "../../../entities/Todo"
import { useNavigate } from "react-router-dom"

interface Props {
	todo: Todo
}

function AchievedTodoRow(props: Props) {

	const navigate = useNavigate()

	return (

		<div className="bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl">

			<button
				onClick={() => {
					navigate(`/todos/${props.todo.id}`)
				}}
				className="w-full h-full py-3 px-4 flex gap-3"
			>

				<span className="text-zinc-500">
					{dayjs(props.todo.achievedAt).format('HH:mm')}
				</span>

				<p className="whitespace-pre-line text-left">{props.todo.content}</p>
			</button>
		</div>
	)
}

export default AchievedTodoRow