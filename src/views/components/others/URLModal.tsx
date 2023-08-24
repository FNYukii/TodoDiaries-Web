import { useEffect } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface Props {
	children: JSX.Element | JSX.Element[]
}

function URLModal(props: Props) {

	const navigate = useNavigate()

	const body = document.body

	useEffect(() => {

		// キーイベント設定
		document.addEventListener("keydown", onKeyDown, false)

		// 画面スクロール無効
		body.style.overflowY = "hidden"

		return () => {
			document.removeEventListener("keydown", onKeyDown, false)
			body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") navigate(-1)
	}

	return (

		<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center dark:text-white">

			<div onClick={() => navigate(-1)} className="w-full h-full bg-black/30 dark:bg-white/20"></div>

			<div className="absolute pt-4 px-8 bg-white rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-auto dark:bg-black">

				<button onClick={() => navigate(-1)} className="ml-negative-4 p-4 transition rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
					<MdOutlineClose className="text-2xl text-zinc-500" />
				</button>

				{props.children}
			</div>
		</div>
	)
}

export default URLModal