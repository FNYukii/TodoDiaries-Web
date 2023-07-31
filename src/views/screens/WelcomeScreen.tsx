import { useNavigate } from "react-router-dom";
import Header from "../components/sections/Header";
import AuthService from "../../utilities/AuthService";
import NavLinkToModal from "../components/others/NavLinkToModal";

function WelcomeScreen() {

	document.title = "ようこそ - Todo Diaries"

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

		<div className="dark:text-white h-screen">

			<Header />

			<main className="mt-4 pb-16 w-full mx-auto px-4 lg:width-lg lg:px-0">

				<section className="mt-4 grid grid-cols-1 px-8 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-8">

					<div className="bg-white dark:bg-zinc-900 rounded-xl p-8">

						<img src="/images/list-and-pencil.png" alt="List and pencil" className="block mx-auto brightness-125" />
						<p className="mt-4 text-center font-bold">Todoを管理しよう</p>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">やるべきこと・やりたいことをアプリに保存し、効率的に管理しましょう。</p>
					</div>

					<div className="bg-white dark:bg-zinc-900 rounded-xl p-8">

						<img src="/images/list-with-date.png" alt="List and pencil" className="block mx-auto brightness-125" />
						<p className="mt-4 text-center font-bold">Todoを達成しよう</p>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">Todoを達成したら、アプリ内で達成済みに変更しましょう。達成したTodoは後から振り返ることができます。</p>
					</div>

					<div className="bg-white dark:bg-zinc-900 rounded-xl p-8">

						<img src="/images/vertical-bar-chart.png" alt="List and pencil" className="block mx-auto brightness-125" />
						<p className="mt-4 text-center font-bold">統計を見よう</p>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">日別のTodo達成数を確認し、日々やったことを振り返りましょう。</p>
					</div>

				</section>

				<section className="mt-8 mx-auto flex flex-wrap gap-8 justify-center w-fit">

					<button onClick={signInWithGoogle} className="font-bold py-2 px-8 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-70 transition">Googleアカウントでサインイン</button>
					<NavLinkToModal to="/sign-in" className="font-bold py-2 px-8 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-70 transition">TodoDiariesアカウントでサインイン</NavLinkToModal >
				</section>
			</main>
		</div>
	);
}

export default WelcomeScreen;