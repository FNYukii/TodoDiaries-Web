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

		<div className="dark:bg-black dark:text-white h-screen">

			<Header />

			<main className="mt-4 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<p>サインインしてください。</p>

				<div className="mx-auto flex flex-wrap gap-8 w-fit">
					<button onClick={signInWithGoogle} className="font-bold py-2 px-8 bg-black text-white rounded-full hover:opacity-70 transition">Googleアカウントでサインイン</button>
					<NavLinkToModal to="/sign-in" className="font-bold py-2 px-8 bg-black text-white rounded-full hover:opacity-70 transition">TodoDiariesアカウントでサインイン</NavLinkToModal >
				</div>
			</main>
		</div>
	);
}

export default WelcomeScreen;