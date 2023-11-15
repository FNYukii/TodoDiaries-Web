import Header from "../components/sections/Header"
import SecondColumn from "../components/columns/SecondColumn"
import ThirdColumn from "../components/columns/ThirdColumn"
import FirstColumn from "../components/columns/FirstColumn"
import { useState } from "react"
import BottomNavigationBar from "../components/sections/BottomNavigationBar"

function HomeScreen() {

	document.title = "Todo Diaries"

	const [tab, setTab] = useState(1)

	return (

		<div className="h-screen flex flex-col">

			<Header showAccountButton />

			<main className="w-full mx-auto px-4 lg:w-[1024px] lg:px-0   overflow-y-hidden">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full">

					<FirstColumn className={`scrollbar-styled overflow-y-auto   pt-4 pb-8 pr-2   ${tab === 1 ? "block" : "hidden sm:block"}`} />
					<SecondColumn className={`scrollbar-styled overflow-y-auto   pt-4 pb-7 pr-2 ml-4    ${tab === 2 ? "block" : "hidden sm:block"}`} />
					<ThirdColumn className={`scrollbar-styled overflow-y-auto   pt-4 pb-8 pl-2   scrollbar-left   ${tab === 3 ? "block sm:hidden lg:block" : "hidden lg:block"}`} />
				</div>
			</main>

			<BottomNavigationBar tab={tab} setTab={setTab} className="sm:hidden sticky top-full"/>
		</div>
	)
}

export default HomeScreen