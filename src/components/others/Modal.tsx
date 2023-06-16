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

		document.title = props.title
		document.addEventListener("keydown", onKeyDown, false)
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

		<div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

			<div onClick={() => navigate(-1)} className="w-full h-full bg-black/30"></div>

			<div className="absolute bg-white rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-auto">

				<div className="pt-4 pl-4">

					<button onClick={() => navigate(-1)} className="p-4 transition hover:bg-gray-100 rounded-full">
						<MdOutlineClose className="text-2xl text-gray-500" />
					</button>
				</div>

				<div className="mt-4 px-8 pb-8">

					{props.children}
				</div>
			</div>
		</div>
	);
}

export default Modal;