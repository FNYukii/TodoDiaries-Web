import AchieveCountAt2DaysBarChart from "../charts/AchieveCountAt2DaysBarChart"
import AchieveCountAtMonthBarChart from "../charts/AchieveCountAtMonthBarChart"

interface Props {
	className?: string
}

function ThirdColumn(props: Props) {



	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">統計</h2>

			<AchieveCountAtMonthBarChart className="mt-4" />

			<AchieveCountAt2DaysBarChart className="mt-8"/>
		</section>
	)
}

export default ThirdColumn