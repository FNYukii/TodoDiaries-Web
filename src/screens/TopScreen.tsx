import Header from "../components/Header"

function TopScreen() {

	return (
		<div>

			<Header/>

			<main className="w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="flex justify-between gap-x-4">

					<div>
						<h2 className="text-2xl">Todo</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
					</div>

					<div>
						<h2 className="text-2xl">達成履歴</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
					</div>

					<div>
						<h2 className="text-2xl">統計</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TopScreen