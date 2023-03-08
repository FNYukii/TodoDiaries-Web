import { NavLink } from "react-router-dom"

function Header() {

	return (

		<header className="py-3 flex justify-between items-center">
			<NavLink to="/" className="text-3xl">Todo Diaries</NavLink>

			<button>アカウント</button>
		</header>
	)
}

export default Header