type Todo = {
	id: string
	userId: string

	content: string
	isPinned: boolean
	order: number

	createdAt: Date
	achievedAt: Date | null
}

export default Todo