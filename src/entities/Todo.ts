type Todo = {
	id: string
	userId: string

	content: string
	isPinned: boolean | null
	order: number | null

	createdAt: Date
	achievedAt: Date | null
}

export default Todo