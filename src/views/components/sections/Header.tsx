import { NavLink } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"

interface Props {
	showAccountButton?: boolean
}

function Header(props: Props) {

	return (

		<header className='w-full mx-auto px-4 lg:width-lg lg:px-0'>

			<div className='py-2 flex justify-between items-center'>

				<NavLink to="/" className="text-3xl">Todo Diaries</NavLink>

				{props.showAccountButton &&
					<NavLink to="/account">

						<BsPersonCircle className="text-2xl text-slate-500" />
					</NavLink>
				}
			</div>
		</header>
	)
}

export default Header