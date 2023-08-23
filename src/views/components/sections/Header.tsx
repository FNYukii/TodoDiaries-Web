import { NavLink } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"
import NavLinkToModal from "../others/NavLinkToModal"

interface Props {
	showAccountButton?: boolean
}

function Header(props: Props) {

	return (

		<header className='w-full mx-auto px-4 lg:width-lg lg:px-0'>

			<div className='py-1 flex justify-between items-center'>

				<NavLink to="/" className="text-3xl">Todo Diaries</NavLink>

				{props.showAccountButton &&
					<NavLinkToModal to="/account" className="mr-negative-3 p-3 rounded-full transition hover:bg-zinc-200 dark:hover:bg-zinc-900">

						<BsPersonCircle className="text-2xl text-zinc-500" />
					</NavLinkToModal>
				}
			</div>
		</header>
	)
}

export default Header