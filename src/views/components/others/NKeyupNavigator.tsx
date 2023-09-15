import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NKeyupNavigator() {

	const navigate = useNavigate()

	function onKeyUp(event: KeyboardEvent) {

		if (event.key === "n") {

			navigate("/new")
		}
	}

	useEffect(() => {

		document.addEventListener("keyup", onKeyUp, false)

		return () => {
			document.removeEventListener("keyup", onKeyUp, false)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div />
	)
}

export default NKeyupNavigator