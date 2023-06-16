interface Props {
	className?: string
}

function TodosSection(props: Props) {

	return (

		<section className={props.className}>

			<h2 className="text-2xl font-bold">Todo</h2>

			<section className="mt-4">

				<span className="text-slate-500">固定済み</span>

				<div className="mt-2 bg-white p-2 rounded-xl divide-y">

					<div className="p-2">
						<p>買い物に行く</p>
					</div>

					<div className="p-2">
						<p>課題をする</p>
					</div>

					<div className="p-2">
						<p>ヨドバシマルチメディア梅田のニトリで、夏用の掛け布団を探す</p>
					</div>
				</div>
			</section>

			<section className="mt-6">

				<span className="text-slate-500">その他</span>

				<div className="mt-2 bg-white p-2 rounded-xl divide-y">

					<div className="p-2">
						<p>お絵描き</p>
					</div>

					<div className="p-2">
						<p>大阪城公園まで散歩に行く</p>
					</div>

					<div className="p-2">
						<p>Minecraftでビルを建てる</p>
					</div>
				</div>
			</section>
		</section>
	);
}

export default TodosSection;