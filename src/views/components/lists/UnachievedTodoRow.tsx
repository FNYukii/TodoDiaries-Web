import Todo from "../../../entities/Todo"
import { useSortable } from "@dnd-kit/sortable"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import TodoContextMenu from "../menus/TodoContextMenu"

interface Props {
	todo: Todo

	className?: string
}

function UnachievedTodoRow(props: Props) {

	// 画面遷移
	const navigate = useNavigate()

	// ドラッグアンドドロップ
	const {
		attributes,
		listeners,
		setNodeRef
	} = useSortable({ id: props.todo.id })

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

		<>

			<div
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				onContextMenu={onContextMenu}
				className={`bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ${props.className}`}
			>

				<button onClick={() => { navigate(`/todos/${props.todo.id}`) }} className="w-full h-full py-3 px-4">

					<p className="whitespace-pre-line text-left">{props.todo.content}</p>
				</button>

			</div>

			<TodoContextMenu isOpen={isOpen} setIsOpen={setIsOpen} anchorPoint={anchorPoint} todo={props.todo} />
		</>
	)
}

export default UnachievedTodoRow