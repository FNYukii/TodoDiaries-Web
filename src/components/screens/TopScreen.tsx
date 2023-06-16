import Header from "../sections/Header"

function TopScreen() {

	return (
		<div className="bg-gray-100 h-screen">

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="flex justify-between gap-x-4">

					<div>

						<h2 className="text-2xl font-bold">Todo</h2>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>
					</div>

					<div className="hidden sm:block">

						<h2 className="text-2xl font-bold">達成履歴</h2>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>
					</div>

					<div className="hidden md:block">

						<h2 className="text-2xl font-bold">統計</h2>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>

						<div className="mt-4 bg-white p-2 rounded-xl">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cum distinctio facilis atque id sed ipsa, molestiae libero consequuntur minus!</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TopScreen