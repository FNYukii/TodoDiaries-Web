import dayjs from "dayjs"
import Todo from "../../../entities/Todo"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import TodoContextMenu from "../menus/TodoContextMenu"

interface Props {
	todo: Todo
}

function AchievedTodoRow(props: Props) {

	// 画面遷移
	const navigate = useNavigate()


	// コンテキストメニュー
	const [isOpen, setIsOpen] = useState(false)
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })

	function onContextMenu(event: React.MouseEvent) {

		if (typeof document.hasFocus === 'function' && !document.hasFocus()) return
		event.preventDefault()

		setAnchorPoint({ x: event.clientX, y: event.clientY })
		setIsOpen(true)
	}

	return (

		<div className="group">

			<button
				onClick={() => { navigate(`/todos/${props.todo.id}`) }}
				onContextMenu={onContextMenu}
				className="w-full   py-3 px-4 flex gap-3   bg-white dark:bg-zinc-800   hover:bg-zinc-200 dark:hover:bg-zinc-700 transition   group-first:rounded-t-xl group-last:rounded-b-xl"
			>

				<span className="text-zinc-500">
					{dayjs(props.todo.achievedAt).format('HH:mm')}
				</span>

				<p className="whitespace-pre-line text-left">{props.todo.content}</p>
			</button>

			<TodoContextMenu isOpen={isOpen} setIsOpen={setIsOpen} anchorPoint={anchorPoint} todo={props.todo} />
		</div>
	)
}

export default AchievedTodoRow