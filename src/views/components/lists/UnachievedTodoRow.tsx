import Todo from "../../../entities/Todo"
import { useSortable } from "@dnd-kit/sortable"
import { useNavigate } from "react-router-dom"
import { ControlledMenu, MenuItem } from '@szhsin/react-menu'
import { useState } from "react"
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"

interface Props {
	todo: Todo
}

function UnachievedTodoRow(props: Props) {

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
	const [isDark, setIsDark] = useState(false)

	function onContextMenu(event: React.MouseEvent) {

		if (typeof document.hasFocus === 'function' && !document.hasFocus()) return
		event.preventDefault()

		setAnchorPoint({ x: event.clientX, y: event.clientY })
		checkTheme()
		setIsOpen(true)
	}

	function checkTheme() {

		const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
		setIsDark(isDark)
	}

	return (

		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			onContextMenu={onContextMenu}
			className="bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition first:rounded-t-xl last:rounded-b-xl"
		>

			<button onClick={() => { navigate(`/todos/${props.todo.id}`) }} className="w-full h-full py-3 px-4">

				<p className="whitespace-pre-line text-left">{props.todo.content}</p>
			</button>

			<ControlledMenu
				anchorPoint={anchorPoint}
				state={isOpen ? 'open' : 'closed'}
				direction="right"
				onClose={() => setIsOpen(false)}
				theming={isDark ? "dark" : undefined}
			>

				{props.todo.isPinned! &&
					<MenuItem>固定をやめる</MenuItem>

				}

				{!props.todo.isPinned! &&
					<MenuItem>固定する</MenuItem>
				}

				<MenuItem>達成済みにする</MenuItem>
				<MenuItem>削除</MenuItem>
			</ControlledMenu>
		</div>
	)
}

export default UnachievedTodoRow