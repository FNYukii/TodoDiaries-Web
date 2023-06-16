import UnachievedTodosList from "../lists/UnachievedTodosList";

interface Props {
	className?: string
}

function TodosSection(props: Props) {

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">Todo</h2>

			<section className="mt-4">

				<span className="text-slate-500">固定済み</span>

				<UnachievedTodosList pinned className="mt-2" />
			</section>

			<section className="mt-6">

				<span className="text-slate-500">その他</span>

				<UnachievedTodosList className="mt-2" />
			</section>
		</section>
	);
}

export default TodosSection;