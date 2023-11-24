import { useSensors, useSensor, KeyboardSensor, DragEndEvent, DndContext, closestCenter, MouseSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Todo from "../../../entities/Todo"
import UnachievedTodoRow from "./UnachievedTodoRow"
import TodoService from "../../../utils/TodoService"

interface Props {
	todos: Todo[]
	label?: string
}

function UnachievedTodoList(props: Props) {

	// Sensorsを取得
	const mouseSensor = useSensor(
		MouseSensor,
		{
			activationConstraint: {
				distance: 5,
			},
		}
	)
	const keyboardSensor = useSensor(KeyboardSensor)
	const sensors = useSensors(mouseSensor, keyboardSensor)

	// Drag後に実行される関数
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

			<div className="mt-2">

				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>

					<SortableContext items={props.todos} strategy={verticalListSortingStrategy}>

						<div>

							{props.todos.map((todo, index) => (

								<UnachievedTodoRow
									todo={todo}
									key={todo.id}
									className={`border-b border-zinc-200 dark:border-zinc-700 ${index === 0 ? "rounded-t-xl" : ""} ${index === props.todos.length - 1 ? "rounded-b-xl border-none" : ""}`}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</div>
		</div>
	)
}

export default UnachievedTodoList