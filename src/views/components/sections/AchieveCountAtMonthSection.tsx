import dayjs from "dayjs"
import { useState } from "react"
import AchieveCountAtMonthBarChart from "../charts/AchieveCountAtMonthBarChart"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

interface Props {
	className?: string
}

function AchieveCountAtMonthSection(props: Props) {

	const [offset, setOffset] = useState(0)

	return (

		<div className={props.className}>

			<div className="mt-4 bg-white p-4 rounded-xl dark:bg-zinc-800">

				<div className="flex justify-between">

					<span className="text-xl">{dayjs().add(offset, 'month').format("YYYY年 M月")}</span>

					<div className="gap-2 mt-negative-3 mr-negative-3">

						<button onClick={() => setOffset(value => value - 1)} className="p-3 hover:bg-zinc-100 rounded-full transition">
							<MdKeyboardArrowLeft className="text-2xl text-zinc-500" />
						</button>

						<button onClick={() => setOffset(value => value + 1)} className="p-3 hover:bg-zinc-100 rounded-full transition">
							<MdKeyboardArrowRight className="text-2xl text-zinc-500" />
						</button>
					</div>
				</div>

				<AchieveCountAtMonthBarChart offset={offset} className="" />
			</div>
		</div>
	)
}

export default AchieveCountAtMonthSection