import ReactLoading from "react-loading"

interface Props {
	showLoading?: boolean
}

function SplashScreen(props: Props) {

	return (

		<div className="bg-white dark:bg-black flex justify-center items-center h-screen">

			<div className="flex flex-col items-center gap-4">

				<h1 className="text-center text-5xl">Todo Diaries</h1>

				<ReactLoading
					type="spin"
					color="#666"
					height="20px"
					width="20px"
					className={props.showLoading ? "" : "opacity-0"}
				/>
			</div>
		</div>
	)
}

export default SplashScreen