import AchievedTodosSection from "../sections/AchievedTodosSection"
import Header from "../sections/Header"
import StatsSection from "../sections/StatsSection"
import TodosSection from "../sections/TodosSection"

function TopScreen() {

	return (
		<div className="bg-slate-100 h-screen">

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">

					<TodosSection />
					<AchievedTodosSection className="hidden sm:block"/>
					<StatsSection className="hidden lg:block"/>
				</div>
			</main>
		</div>
	)
}

export default TopScreen