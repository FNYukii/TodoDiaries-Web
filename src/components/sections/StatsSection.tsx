interface Props {
	className?: string
}

function StatsSection(props: Props) {

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">統計</h2>

			<div className="mt-4 bg-white p-4 rounded-xl">
				<p>Vertical bar chart</p>
			</div>

			<div className="mt-4 bg-white p-4 rounded-xl">
				<p>Horizontal bar chart</p>
			</div>
		</section>
	)
}

export default StatsSection;