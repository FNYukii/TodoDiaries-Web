import { useState } from "react"
import ReactLoading from "react-loading"

function SplashScreen() {

	const [is1000msPassed, setIs1000msPassed] = useState(false)

	// ローディングアイコンを表示する時間を設定
	setTimeout(() => {
		setIs1000msPassed(true)
	}, 1000);

	return (

		<div className="bg-white dark:bg-black flex justify-center items-center h-screen">

			<div className="flex flex-col items-center gap-4">

				<h1 className="text-center text-5xl">Todo Diaries</h1>

				<ReactLoading
					type="spin"
					color="#666"
					height="20px"
					width="20px"
					className={is1000msPassed ? "" : "opacity-0"}
				/>
			</div>
		</div>
	)
}

export default SplashScreen