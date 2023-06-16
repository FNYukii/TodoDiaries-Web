import AchievedTodosSection from "../sections/AchievedTodosSection"
import Header from "../sections/Header"
import StatsSection from "../sections/StatsSection"
import TodosSection from "../sections/TodosSection"

function TopScreen() {

	return (
		<div className="bg-gray-100 h-screen">

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="flex justify-between gap-x-4">

					<TodosSection />
					<AchievedTodosSection />
					<StatsSection />
				</div>
			</main>
		</div>
	)
}

export default TopScreen