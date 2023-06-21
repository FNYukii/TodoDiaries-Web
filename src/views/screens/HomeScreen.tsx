import AchievedTodosSection from "../components/sections/AchievedTodosSection"
import Header from "../components/sections/Header"
import StatsSection from "../components/sections/StatsSection"
import UnachievedTodosSection from "../components/sections/TodosSection"

function HomeScreen() {

	document.title = "Todo Diaries"

	return (

		<div className="bg-slate-100 dark:bg-black dark:text-white h-screen">

			<Header showAccountButton />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">

					<UnachievedTodosSection />
					<AchievedTodosSection className="hidden sm:block" />
					<StatsSection className="hidden lg:block" />
				</div>
			</main>
		</div>
	)
}

export default HomeScreen