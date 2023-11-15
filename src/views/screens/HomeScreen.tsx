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

			<div className="w-full mx-auto px-4 lg:w-[1024px] lg:px-0 overflow-y-auto scrollbar-none">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 h-full">

					<FirstColumn className={`pt-4 pb-8 pr-2 scrollbar-styled overflow-y-auto ${tab === 1 ? "block" : "hidden sm:block"}`} />
					<SecondColumn className={`pt-4 pb-7 pr-2 scrollbar-styled overflow-y-auto ${tab === 2 ? "block" : "hidden sm:block"}`} />
					<ThirdColumn className={`pt-4 pb-8 pr-2 scrollbar-styled overflow-y-auto ${tab === 3 ? "block sm:hidden lg:block" : "hidden lg:block"}`} />
				</div>
			</div>

			<BottomNavigationBar tab={tab} setTab={setTab} className="sm:hidden sticky top-full"/>
		</div>
	)
}

export default HomeScreen