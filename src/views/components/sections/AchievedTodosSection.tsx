interface Props {
	className?: string
}

function AchievedTodosSection(props: Props) {

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">達成済み</h2>

			<div className="mt-4 space-y-6">

				<div>

					<span className="inline-block text-zinc-500">2023年6月16日 金曜日</span>

					<div className="mt-2 bg-white px-2 py-1 rounded-xl divide-y dark:bg-zinc-800 dark:divide-zinc-600">

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">16:20</span>
							<p>やよい軒に行く</p>
						</div>

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">11:45</span>
							<p>買い物</p>
						</div>
					</div>
				</div>

				<div>

					<span className="inline-block text-zinc-500">2023年6月15日 木曜日</span>

					<div className="mt-2 bg-white px-2 py-1 rounded-xl divide-y dark:bg-zinc-800 dark:divide-zinc-600">

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">14:06</span>
							<p>お絵描き</p>
						</div>
					</div>
				</div>

				<div>
					<span className="inline-block text-zinc-500">2023年6月15日 木曜日</span>

					<div className="mt-2 bg-white px-2 py-1 rounded-xl divide-y dark:bg-zinc-800 dark:divide-zinc-600">

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">20:25</span>
							<p>洗濯をする</p>
						</div>

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">10:00</span>
							<p>クーラーの掃除をする</p>
						</div>

						<div className="p-2 flex gap-1">
							<span className="text-zinc-500">9:30</span>
							<p>床の掃除をする</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AchievedTodosSection