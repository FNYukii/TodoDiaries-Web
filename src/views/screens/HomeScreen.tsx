import Header from "../components/sections/Header"
import SecondColumn from "../components/columns/SecondColumn"
import ThirdColumn from "../components/columns/ThirdColumn"
import FirstColumn from "../components/columns/FirstColumn"

function HomeScreen() {

	document.title = "Todo Diaries"

	return (

		<div>

			<Header showAccountButton />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0 pb-16">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">

					<FirstColumn />
					<SecondColumn className="hidden sm:block" />
					<ThirdColumn className="hidden lg:block" />
				</div>
			</main>
		</div>
	)
}

export default HomeScreen