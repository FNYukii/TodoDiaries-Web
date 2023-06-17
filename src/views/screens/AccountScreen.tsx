import AuthService from "../../utilities/AuthService";
import Modal from "../components/others/Modal";

function AccountScreen() {

	return (

		<Modal title="アカウント">

			<div className="px-8 pt-4 pb-7">

				<h1 className="text-2xl font-bold">アカウント</h1>

				<p className="mt-4">メールアドレス</p>
				<p className="text-slate-500">{AuthService.email()}</p>

				<button onClick={() => AuthService.signOut()} className="mt-4 block mx-auto text-red-500 font-bold px-2 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition">サインアウト</button>
			</div>
		</Modal>
	);
}

export default AccountScreen;