import { Link, useLocation } from "react-router-dom"

interface Props {
	to: string
	className?: string
	children: JSX.Element | JSX.Element[] | string
}

function NavLinkToModal(props: Props) {

	const location = useLocation()

	return (
		
		<Link state={{ from: location.pathname }} to={props.to} className={props.className}>
			{props.children}
		</Link >
	)
}

export default NavLinkToModal