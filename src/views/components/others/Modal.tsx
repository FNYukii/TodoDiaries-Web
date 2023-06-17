import { useEffect } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface Props {
	title: string
	children: JSX.Element | JSX.Element[]
}

function Modal(props: Props) {

	const navigate = useNavigate()

	const body = document.body

	useEffect(() => {

		// ページTitle設定
		document.title = props.title

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

			<div className="absolute bg-white rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-auto dark:bg-black">

				<div className="pt-4 pl-4">

					<button onClick={() => navigate(-1)} className="p-4 transition rounded-full hover:bg-gray-100 dark:hover:bg-slate-900">
						<MdOutlineClose className="text-2xl text-slate-500" />
					</button>
				</div>

				{props.children}
			</div>
		</div>
	)
}

export default Modal