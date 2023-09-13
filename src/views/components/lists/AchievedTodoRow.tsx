import dayjs from "dayjs"
import NavLinkToModal from "../others/NavLinkToModal"
import Todo from "../../../entities/Todo"

interface Props {
	todo: Todo
}

function AchievedTodoRow(props: Props) {

	return (

		<NavLinkToModal to={`/todos/${props.todo.id}`} key={props.todo.id} className="block py-3 px-4 flex gap-3 bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl">

			<span className="text-zinc-500">
				{dayjs(props.todo.achievedAt).format('HH:mm')}
			</span>

			<p className="whitespace-pre-line">{props.todo.content}</p>
		</NavLinkToModal>
	)
}

export default AchievedTodoRow