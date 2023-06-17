import { useNavigate } from "react-router-dom";
import Header from "../components/sections/Header";
import AuthService from "../../utilities/AuthService";
import NavLinkToModal from "../components/others/NavLinkToModal";

function WelcomeScreen() {

	const navigate = useNavigate()

	async function signInWithGoogle() {

		const uid = await AuthService.signInWithGoogle()

		// 失敗
		if (uid === null) {
			return
		}

		// 成功
		navigate("/")
	}

	return (

		<div className="bg-slate-100 dark:bg-black dark:text-white h-screen">

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">

					<div>Create Todos</div>
					<div>Achieve Todos</div>
					<div>Check Stats</div>
				</div>

				<div className="flex justify-around">

					<button onClick={signInWithGoogle}>Googleアカウントでサインイン</button>
					<NavLinkToModal to="/sign-in">TodoDiariesアカウントでサインイン</NavLinkToModal >
				</div>
			</main>
		</div>
	);
}

export default WelcomeScreen;