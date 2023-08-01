import { useEffect } from "react"
import { MdOutlineClose } from "react-icons/md"

interface Props {

	title: string
	acceptLabel: string
	destractiveDialog?: boolean
	onClose: () => any
	onAccept: () => any
}

function StateModal(props: Props) {

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

		if (event.key === "Escape") {
			// props.onClose
		}
	}

	return (

		<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center dark:text-white">

			<div onClick={props.onClose} className="w-full h-full bg-black/30 dark:bg-white/20"></div>

			<div className="absolute bg-white rounded-xl md:width-400 w-11/12 max-height-screen-90 overflow-y-auto dark:bg-black">

				<div className="pt-4 pl-4">

					<button type="button" onClick={props.onClose} className="p-4 transition rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
						<MdOutlineClose className="text-2xl text-zinc-500" />
					</button>
				</div>

				<p className="mt-4 mx-8 text-xl font-bold">{props.title}</p>

				<div className="flex mt-5 mx-4 pb-8 justify-between">

					<button type="button" onClick={props.onClose} className="font-bold py-1 px-4 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900">キャンセル</button>
					<button type="button" onClick={props.onAccept} className={`font-bold py-1 px-4 rounded-full transition ${props.destractiveDialog ? "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50" : "hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}>{props.acceptLabel}</button>
				</div>
			</div>
		</div>
	)
}

export default StateModal