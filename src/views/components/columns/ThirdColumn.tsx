import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface Props {
	className?: string
}

function ThirdColumn(props: Props) {

	const data = [
		{
			name: 'Page A',
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Page B',
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: 'Page C',
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: 'Page D',
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: 'Page E',
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: 'Page F',
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: 'Page G',
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">統計</h2>

			<div className="mt-4 bg-white px-4 py-3 rounded-xl dark:bg-zinc-800">
				<p className="text-zinc-500">Vertical bar chart</p>

				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" />
				</BarChart>
			</div>

			<div className="mt-4 bg-white px-4 py-3 rounded-xl dark:bg-zinc-800">
				<p className="text-zinc-500">Horizontal bar chart</p>
			</div>
		</section>
	)
}

export default ThirdColumn