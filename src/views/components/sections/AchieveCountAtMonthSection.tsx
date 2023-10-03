import dayjs from "dayjs"
import { useState } from "react"
import AchieveCountAtMonthBarChart from "../charts/AchieveCountAtMonthBarChart"

interface Props {
	className?: string
}

function AchieveCountAtMonthSection(props: Props) {

	const [offset, setOffset] = useState(0)

	return (

		<div className={props.className}>

			<div className="mt-4 bg-white p-4 rounded-xl dark:bg-zinc-800">

				<p className="text-xl">{dayjs().add(offset, 'month').format("YYYY年 M月")}</p>

				<AchieveCountAtMonthBarChart offset={0} className="" />
			</div>
		</div>
	)
}

export default AchieveCountAtMonthSection