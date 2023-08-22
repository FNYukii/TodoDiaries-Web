import Header from "../components/sections/Header"
import SecondColumn from "../components/columns/SecondColumn"
import ThirdColumn from "../components/columns/ThirdColumn"
import FirstColumn from "../components/columns/FirstColumn"

function HomeScreen() {

	document.title = "Todo Diaries"

	return (

		<div className="h-screen flex flex-col">

			<Header showAccountButton />

			<main className="w-full mx-auto px-4 lg:width-lg lg:px-0 overflow-y-auto scrollbar-none">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 h-full">

					<FirstColumn className="pt-4 pb-8 pr-4 h-full overflow-y-auto scrollbar-styled transition" />
					<SecondColumn className="pt-4 pb-8 pr-4 h-full overflow-y-auto scrollbar-styled transition hidden sm:block" />
					<ThirdColumn className="pt-4 hidden lg:block" />
				</div>
			</main>
		</div>
	)
}

export default HomeScreen