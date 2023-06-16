import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../buttons/SubmitButton"
import EmailInput from "../inputs/EmailInput"
import PasswordInput from "../inputs/PasswordInput"

function SignInSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

		setIsLoading(true)

		// フォーム送信を無効
		e.preventDefault()

		// TODO: サインイン

		// 成功
		navigate(-1)
	}

	return (
		<div>

			<form onSubmit={(e) => onSubmit(e)}>

				<div >

					<p className="text-2xl font-bold">サインイン</p>

					<EmailInput value={email} onChange={setEmail} className="mt-4" />
					<PasswordInput value={password} onChange={setPassword} className="mt-4" />
				</div>

				<div className="mt-4 flex justify-between items-center">

					<button type="button" onClick={() => props.setIsShowSignUpSection(true)} className="hover:underline h-fit">新しいアカウントを作成</button>

					<SubmitButton text="サインイン" disabled={email === "" || password === ""} isLoading={isLoading} />
				</div>
			</form>
		</div>
	)
}

export default SignInSection