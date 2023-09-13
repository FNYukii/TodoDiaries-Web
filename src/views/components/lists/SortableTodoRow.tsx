import dayjs from "dayjs"
import Todo from "../../../entities/Todo"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Props {
	todo: Todo
}

function SortableTodoRow(props: Props) {

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: props.todo.id })

	const style = {
		// transform: CSS.Transform.toString(transform),
		transition
	}

	return (

		<div ref={setNodeRef} {...attributes} {...listeners} style={style} className="first:rounded-t-xl last:rounded-b-xl bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">

			{/* <NavLinkToModal to={`/todos/${props.todo.id}`} key={props.todo.id} className="block py-3 px-4 flex gap-3 ">

				<>
					{props.todo.achievedAt !== null &&

						<span className="text-zinc-500">
							{dayjs(props.todo.achievedAt).format('HH:mm')}
						</span>
					}
				</>

				<p className="whitespace-pre-line">{props.todo.content}</p>

				<p className="text-zinc-500">{props.todo.order}</p>
			</NavLinkToModal> */}

			<div className="block py-3 px-4 flex gap-3">

				<>
					{props.todo.achievedAt !== null &&

						<span className="text-zinc-500">
							{dayjs(props.todo.achievedAt).format('HH:mm')}
						</span>
					}
				</>

				<p className="whitespace-pre-line">{props.todo.content}</p>

				<p className="text-zinc-500">{props.todo.order}</p>
			</div>
		</div>
	)
}

export default SortableTodoRow