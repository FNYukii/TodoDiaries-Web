import { useState } from "react"
import SubmitButton from "../buttons/SubmitButton"
import EmailInput from "../inputs/EmailInput"
import PasswordInput from "../inputs/PasswordInput"

function SignUpSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

		setIsLoading(true)

		// フォーム送信を無効
		e.preventDefault()

		// TODO: サインアップ
		// TODO: navigate(-1)
		alert("失敗しました。TodoDiariesアカウントでのサインアップは未実装です。")
		setIsLoading(false)
	}

	return (
		<div>

			<form onSubmit={(e) => onSubmit(e)}>

				<div className="px-8">

					<p className="mt-4 text-2xl font-bold">アカウントを作成</p>

					<EmailInput value={email} onChange={setEmail} className="mt-4" />
					<PasswordInput value={password} onChange={setPassword} className="mt-4" />
					<PasswordInput value={passwordConfirm} onChange={setPasswordConfirm} placeholder="パスワードを確認" className="mt-4" />
				</div>

				<div className="mt-4 mr-4 ml-8 mb-7 flex justify-between items-center">

					<button type="button" onClick={() => props.setIsShowSignUpSection(false)} className="hover:underline h-fit">既存のアカウントを使う</button>

					<SubmitButton text="サインアップ" isLoading={isLoading} disabled={email === "" || password === "" || password !== passwordConfirm} />
				</div>
			</form>
		</div>
	)
}

export default SignUpSection