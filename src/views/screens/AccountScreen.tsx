import { useNavigate } from "react-router-dom";
import AuthService from "../../utilities/AuthService";
import URLModal from "../components/others/URLModal";

function AccountScreen() {

	document.title = "アカウント - Todo Diaries"

	const navigate = useNavigate()

	async function signOut() {

		// サインアウトする
		const uid = await AuthService.signOut()

		// 失敗
		if (uid === null) {
			return
		}

		// 成功
		navigate("/")
	}

	return (

		<URLModal>

			<div className="mx-8">

				<h1 className="mt-4 text-2xl font-bold">アカウント</h1>

				<p className="mt-4">メールアドレス</p>
				<p className="text-zinc-500">{AuthService.email()}</p>

				<button onClick={signOut} className="mt-4 mb-7 block mx-auto text-red-500 font-bold px-4 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition">サインアウト</button>
			</div>
		</URLModal>
	);
}

export default AccountScreen;