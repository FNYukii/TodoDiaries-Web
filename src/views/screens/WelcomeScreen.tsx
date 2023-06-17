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

				<p>サインインしてください。</p>

				<button onClick={signInWithGoogle} className="mt-4 font-bold">Googleアカウントでサインイン</button>
				<NavLinkToModal to="/sign-in" className="mt-2 block font-bold">TodoDiariesアカウントでサインイン</NavLinkToModal >
			</main>
		</div>
	);
}

export default WelcomeScreen;