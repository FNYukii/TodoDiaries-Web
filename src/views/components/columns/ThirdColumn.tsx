import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts"

interface Props {
	className?: string
}

function ThirdColumn(props: Props) {

	const data = [
		{
			day: 1,
			todoCount: 4
		},
		{
			day: 2,
			todoCount: 7
		},
		{
			day: 3,
			todoCount: 12
		},
		{
			day: 4,
			todoCount: 3
		},
		{
			day: 5,
			todoCount: 2
		},
		{
			day: 6,
			todoCount: 17
		},
		{
			day: 7,
			todoCount: 9
		},
		{
			day: 8,
			todoCount: 3
		},
		{
			day: 9,
			todoCount: 5
		},
		{
			day: 10,
			todoCount: 1
		},
		{
			day: 11,
			todoCount: 7
		},
		{
			day: 12,
			todoCount: 3
		},
		{
			day: 13,
			todoCount: 4
		},
		{
			day: 14,
			todoCount: 5
		},
		{
			day: 15,
			todoCount: 11
		}
	]

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">統計</h2>

			<div className="mt-4 bg-white px-4 py-3 rounded-xl dark:bg-zinc-800">
				<p className="text-xl">2023年 9月</p>
				<p className="text-zinc-500">達成したTodo 32</p>

				<BarChart
					width={300}
					height={300}
					data={data}
					className="mt-2"
				>
					<CartesianGrid stroke="#444" />
					<XAxis dataKey="day" />
					<YAxis width={20} />
					<Bar dataKey="todoCount" fill="#3b82f6" />
				</BarChart>
			</div>

			<div className="mt-4 bg-white px-4 py-3 rounded-xl dark:bg-zinc-800">
				<p className="text-zinc-500">Horizontal bar chart</p>
			</div>
		</section>
	)
}

export default ThirdColumn