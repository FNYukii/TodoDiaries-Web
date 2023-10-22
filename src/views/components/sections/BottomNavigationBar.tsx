import { AiOutlineCheck } from "react-icons/ai"
import { BsCalendarCheck, BsBarChartLine } from "react-icons/bs"

interface Props {
	tab: number
	setTab: React.Dispatch<React.SetStateAction<number>>

	className?: string
}

function BottomNavigationBar(props: Props) {

	return (

		<div className={props.className}>

			<div className="border-t border-zinc-200 dark:border-zinc-900 px-4 py-4 flex justify-around gap-4">

				<button onClick={() => props.setTab(1)}>
					<AiOutlineCheck className={`text-2xl ${props.tab === 1 ? "text-blue-500" : "text-zinc-500"}`} />
				</button>

				<button onClick={() => props.setTab(2)}>
					<BsCalendarCheck className={`text-2xl ${props.tab === 2 ? "text-blue-500" : "text-zinc-500"}`} />
				</button>

				<button onClick={() => props.setTab(3)}>
					<BsBarChartLine className={`text-2xl ${props.tab === 3 ? "text-blue-500" : "text-zinc-500"}`} />
				</button>
			</div>
		</div>
	)
}

export default BottomNavigationBar