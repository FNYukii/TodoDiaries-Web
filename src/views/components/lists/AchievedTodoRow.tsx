import dayjs from "dayjs"
import Todo from "../../../entities/Todo"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import TodoContextMenu from "../others/TodoContextMenu"

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

		<div onContextMenu={onContextMenu} className="bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl">

			<button onClick={() => { navigate(`/todos/${props.todo.id}`) }} className="w-full h-full py-3 px-4 flex gap-3">

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