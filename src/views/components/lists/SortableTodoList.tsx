import { useSensors, useSensor, PointerSensor, KeyboardSensor, DragEndEvent, DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Todo from "../../../entities/Todo"
import { useState } from "react"
import SortableTodoRow from "./SortableTodoRow"

interface Props {
	todos: Todo[]
	label?: string
}

function SortableTodoList(props: Props) {

	const [todos, setTodos] = useState<Todo[]>(props.todos)

	const sensors = useSensors(

		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const onDragEnd = (event: DragEndEvent) => {

		const { active, over } = event

		if (!over) {
			return
		}

		if (active.id !== over.id) {

			const oldIndex = todos.findIndex((v) => v.id === active.id)
			const newIndex = todos.findIndex((v) => v.id === over.id)
			setTodos(arrayMove(todos, oldIndex, newIndex))
		}
	}

	return (

		<div className="mt-4">

			{props.label &&
				<span className="text-zinc-500">{props.label}</span>
			}

			<div className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-700">

				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>

					<SortableContext items={todos} strategy={verticalListSortingStrategy}>

						<ul>

							{todos.map((todo) => (
								<SortableTodoRow todo={todo} />
							))}
						</ul>
					</SortableContext>
				</DndContext>
			</div>
		</div>
	)
}

export default SortableTodoList