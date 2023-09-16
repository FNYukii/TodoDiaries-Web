import Todo from "../../../entities/Todo"
import { useSortable } from "@dnd-kit/sortable"
import { useNavigate } from "react-router-dom"
// import { CSS } from "@dnd-kit/utilities"

interface Props {
	todo: Todo
}

function UnachievedTodoRow(props: Props) {

	const {
		attributes,
		listeners,
		setNodeRef,
		// transform,
		transition
	} = useSortable({ id: props.todo.id })

	const style = {
		// transform: CSS.Transform.toString(transform),
		transition
	}

	const navigate = useNavigate()

	function onContextMenu(event: React.MouseEvent) {
    event.preventDefault();

    console.log("Hello")
  }

	return (

		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			onContextMenu={onContextMenu}
			className="bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl"
		>

			<button
				onClick={() => {
					navigate(`/todos/${props.todo.id}`)
				}}
				className="w-full h-full py-3 px-4"
			>

				<p className="whitespace-pre-line text-left">{props.todo.content}</p>
			</button>
		</div>
	)
}

export default UnachievedTodoRow