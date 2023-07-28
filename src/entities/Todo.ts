type Todo = {
	id: string
	userId: string
	createdAt: Date

	content: string

	isPinned: boolean | null
	order: number | null
	
	achievedAt: Date | null
}

export default Todo