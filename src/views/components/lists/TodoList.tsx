import Todo from "../../../entities/Todo"
import TodoRow from "./TodoRow"

interface Props {
	todos: Todo[]
	label?: string
}

function TodoList(props: Props) {

	return (

		<div className="mt-4">

			{props.label &&
				<span className="text-zinc-500">{props.label}</span>
			}

			<div className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-700">

				{props.todos.map((todo) => (

					<TodoRow todo={todo} key={todo.id} />
				))}
			</div>
		</div>
	)
}

export default TodoList