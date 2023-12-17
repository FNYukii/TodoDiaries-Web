import { AiOutlinePlus } from "react-icons/ai"
import NavLinkToModal from "../others/NavLinkToModal"
import { useEffect, useState } from "react"
import Todo from "../../../entities/Todo"
import { Unsubscribe } from "firebase/firestore"
import ReactLoading from "react-loading"
import TodoService from "../../../utils/TodoService"
import UnachievedTodoList from "../lists/UnachievedTodoList"

interface Props {
	className?: string
}

function FirstColumn(props: Props) {

	// Pinned Todos
	const [pinnedTodos, setPinnedTodos] = useState<Todo[] | null>(null)
	const [isLoadedPinnedTodos, setIsLoadedPinnedTodos] = useState(false)

	// Unpinned Todos
	const [unpinnedTodos, setUnpinnedTodos] = useState<Todo[] | null>(null)
	const [isLoadedUnpinnedTodos, setIsLoadedUnpinnedTodos] = useState(false)



	// Pinned Todosを読み取るリスナー
	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onUnachievedTodosChanged(false, todos => {

				setUnpinnedTodos(todos)
				setIsLoadedUnpinnedTodos(true)

			}, (error) => {

				setIsLoadedUnpinnedTodos(true)
			})

		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [])



	// Unpinned Todosを読み取るリスナー
	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await TodoService.onUnachievedTodosChanged(true, todos => {

				setPinnedTodos(todos)
				setIsLoadedPinnedTodos(true)

			}, (error) => {

				setIsLoadedPinnedTodos(true)
			})

		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [])



	return (

		<div className={`pb-8 ${props.className}`}>

			<div className="flex justify-between">

				<h2 className="text-2xl font-bold">Todo</h2>

				<NavLinkToModal to="/new" className="mr-[-1rem] py-1 px-4 flex gap-1 items-center text-blue-500 rounded-full transition hover:bg-blue-100 dark:hover:bg-blue-900/50">

					<AiOutlinePlus className="text-xl" />
					<span>新規Todo</span>
				</NavLinkToModal>
			</div>

			<div>

				{(!isLoadedPinnedTodos || !isLoadedUnpinnedTodos) &&
					<div className="flex justify-center">

						<ReactLoading
							type="spin"
							color="#666"
							height="20px"
							width="20px"
							className="mt-4"
						/>
					</div>
				}

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && (pinnedTodos === null || unpinnedTodos === null) &&
					<div>
						<p className="mt-4 text-zinc-500">読み取りに失敗しました</p>
					</div>
				}

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && pinnedTodos !== null && unpinnedTodos !== null && pinnedTodos.length === 0 && unpinnedTodos.length === 0 &&
					<div>
						<p className="mt-4 text-zinc-500">未達成のTodoはありません</p>
					</div>
				}

				{isLoadedPinnedTodos && isLoadedUnpinnedTodos && pinnedTodos !== null && unpinnedTodos !== null && (pinnedTodos.length !== 0 || unpinnedTodos.length !== 0) &&
					<div>

						{pinnedTodos.length !== 0 && unpinnedTodos.length !== 0 &&
							<div>

								<UnachievedTodoList todos={pinnedTodos} label="固定済み" />
								<UnachievedTodoList todos={unpinnedTodos} label="その他" />
							</div>
						}

						{pinnedTodos.length !== 0 && unpinnedTodos.length === 0 &&
							<div>

								<UnachievedTodoList todos={pinnedTodos} label="固定済み" />
							</div>
						}

						{pinnedTodos.length === 0 && unpinnedTodos.length !== 0 &&
							<div>

								<UnachievedTodoList todos={unpinnedTodos} />
							</div>
						}
					</div>
				}
			</div>
		</div>
	)
}

export default FirstColumn