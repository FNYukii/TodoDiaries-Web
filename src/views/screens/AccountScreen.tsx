import { useNavigate } from "react-router-dom"
import AuthService from "../../utilities/AuthService"
import URLModal from "../components/modals/URLModal"
import { useState } from "react"
import StateModal from "../components/modals/StateModal"

function AccountScreen() {

	document.title = "アカウント - Todo Diaries"

	const [isShowSignOutModal, setIsShowSignOutModal] = useState(false)

	const navigate = useNavigate()

	return (

		<URLModal>

			<div>

				<h1 className="mt-4 text-2xl font-bold">アカウント</h1>

				<p className="mt-4">メールアドレス</p>
				<p className="text-zinc-500">{AuthService.email()}</p>

				<button onClick={() => setIsShowSignOutModal(true)} className="mt-4 mb-7 block mx-auto text-red-500 font-bold px-4 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition">サインアウト</button>

				{isShowSignOutModal &&

					<StateModal
						title="サインアウトしてもよろしいですか?"
						acceptLabel="サインアウト"
						destractiveDialog
						onClose={() => setIsShowSignOutModal(false)}
						onAccept={async () => {

							// サインアウトする
							const uid = await AuthService.signOut()

							// 失敗
							if (uid === null) {

								alert("サインアウトに失敗しました")
								return
							}

							// 成功
							navigate("/")
						}}
					/>
				}
			</div>
		</URLModal>
	)
}

export default AccountScreen