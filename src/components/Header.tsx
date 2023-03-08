import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function Header() {

	return (

		<header className="py-3 flex justify-between items-center">
			<NavLink to="/" className="text-3xl">Todo Diaries</NavLink>

			<button>

				<BsPersonCircle className="text-2xl"/>
			</button>
		</header>
	)
}

export default Header