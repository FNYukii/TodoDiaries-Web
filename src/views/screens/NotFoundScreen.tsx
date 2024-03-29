import { NavLink } from "react-router-dom"
import Header from "../components/sections/Header"

interface Props {
	onForeground?: boolean
}

function NotFoundScreen(props: Props) {

	document.title = "Not found - Todo Diaries"

	return (

		<div className={` ${props.onForeground ? "z-30 fixed top-0 left-0 w-full h-full bg-slate-100" : undefined}`}>

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:w-[1024px] lg:px-0">

				<h1 className="text-2xl font-bold text-center">Page not found</h1>
				<p className="mt-2 text-center">このページは存在しないか、現在のサインイン状態ではアクセスできません。</p>

				<NavLink to="/" className="block mt-8 mx-auto w-fit font-bold py-2 px-8 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-70 transition">トップへ戻る</NavLink>
			</main>
		</div>
	)
}

export default NotFoundScreen