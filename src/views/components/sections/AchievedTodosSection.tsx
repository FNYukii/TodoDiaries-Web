interface Props {
	className?: string
}

function AchievedTodosSection(props: Props) {

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">達成済み</h2>

			<div className="mt-4 space-y-6">

				<div>

					<span className="inline-block text-slate-500">2023年6月16日 金曜日</span>

					<div className="mt-2 p-2 rounded-xl divide-y dark:bg-slate-800 bg-white dark:divide-slate-600">

						<div className="p-2">
							<p>やよい軒に行く</p>
						</div>

						<div className="p-2">
							<p>映画の予約</p>
						</div>
					</div>
				</div>

				<div>

					<span className="inline-block text-slate-500">2023年6月15日 木曜日</span>

					<div className="mt-2 p-2 rounded-xl divide-y dark:bg-slate-800 bg-white dark:divide-slate-600">

						<div className="p-2">
							<p>お絵描き</p>
						</div>
					</div>
				</div>

				<div>
					<span className="inline-block text-slate-500">2023年6月15日 木曜日</span>

					<div className="mt-2 p-2 rounded-xl divide-y dark:bg-slate-800 bg-white dark:divide-slate-600">

						<div className="p-2">
							<p>買い物</p>
						</div>

						<div className="p-2">
							<p>洗濯</p>
						</div>

						<div className="p-2">
							<p>化粧水を買う</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AchievedTodosSection;