import { useSensors, useSensor, PointerSensor, KeyboardSensor, DragEndEvent, DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Todo from "../../../entities/Todo"
import UnachievedTodoRow from "./UnachievedTodoRow"
import TodoService from "../../../utilities/TodoService"

interface Props {
	todos: Todo[]
	label?: string
}

function UnachievedTodoList(props: Props) {

	const sensors = useSensors(

		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const onDragEnd = async (event: DragEndEvent) => {

		const { active, over } = event

		if (!over) {
			return
		}

		if (active.id !== over.id) {

			const oldIndex = props.todos.findIndex((item) => item.id === active.id)
			const newIndex = props.todos.findIndex((item) => item.id === over.id)

			const result = await TodoService.moveTodo(props.todos, oldIndex, newIndex)

			if (result === null) {
				alert("Todoの並び替えに失敗しました。")
			}
		}
	}

	return (

		<div className="mt-4">

			{props.label &&
				<span className="text-zinc-500">{props.label}</span>
			}

			<div className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-700">

				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>

					<SortableContext items={props.todos} strategy={verticalListSortingStrategy}>

						<ul>

							{props.todos.map((todo) => (
								<UnachievedTodoRow todo={todo} key={todo.id} />
							))}
						</ul>
					</SortableContext>
				</DndContext>
			</div>
		</div>
	)
}

export default UnachievedTodoList