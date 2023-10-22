import Header from "../components/sections/Header"
import SecondColumn from "../components/columns/SecondColumn"
import ThirdColumn from "../components/columns/ThirdColumn"
import FirstColumn from "../components/columns/FirstColumn"
import { useState } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { BsBarChartLine, BsCalendarCheck } from "react-icons/bs"

function HomeScreen() {

	document.title = "Todo Diaries"

	// eslint-disable-next-line
	const [tab, setTab] = useState(1)

	return (

		<div className="h-screen flex flex-col">

			<Header showAccountButton />

			<div className="w-full mx-auto px-4 lg:width-lg lg:px-0 overflow-y-auto scrollbar-none">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 h-full">

					<FirstColumn className={`pt-4 pb-8 pr-2 h-full overflow-y-auto scrollbar-styled ${tab === 1 ? "block" : "hidden sm:block"}`} />
					<SecondColumn className={`pt-4 pb-8 pr-2 h-full overflow-y-auto scrollbar-styled ${tab === 2 ? "block" : "hidden sm:block"}`} />
					<ThirdColumn className={`pt-4 ${tab === 3 ? "block sm:hidden lg:block" : "hidden lg:block"}`} />
				</div>
			</div>

			<div className="border-t px-4 py-4 flex justify-around gap-4">

				<button onClick={() => setTab(1)}>
					<AiOutlineCheck className={`text-2xl ${tab === 1 ? "text-blue-500" : "text-zinc-500"}`}/>
				</button>

				<button onClick={() => setTab(2)}>
					<BsCalendarCheck className={`text-2xl ${tab === 2 ? "text-blue-500" : "text-zinc-500"}`}/>
				</button>

				<button onClick={() => setTab(3)}>
					<BsBarChartLine className={`text-2xl ${tab === 3 ? "text-blue-500" : "text-zinc-500"}`}/>
				</button>
			</div>
		</div>
	)
}

export default HomeScreen