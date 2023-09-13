import Todo from "../../../entities/Todo"
import AchievedTodoRow from "./AchievedTodoRow"

interface Props {
	todos: Todo[]
	label?: string
}

function AchievedTodoList(props: Props) {

	return (

		<div className="mt-4">

			{props.label &&
				<span className="text-zinc-500">{props.label}</span>
			}

			<div className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-700">

				{props.todos.map((todo) => (

					<AchievedTodoRow todo={todo} key={todo.id} />
				))}
			</div>
		</div>
	)
}

export default AchievedTodoList