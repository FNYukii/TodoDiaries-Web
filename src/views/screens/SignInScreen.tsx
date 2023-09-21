import { useState } from "react"
import URLModal from "../components/modals/URLModal"
import SignInSection from "../components/sections/SignInSection"
import SignUpSection from "../components/sections/SignUpSection"

function SignInScreen() {

	document.title = "サインイン - Todo Diaries"

	const [isShowSignUpSection, setIsShowSignUpSection] = useState(false)

	return (

		<URLModal>

			<div>

				{!isShowSignUpSection &&
					<SignInSection setIsShowSignUpSection={setIsShowSignUpSection} />
				}

				{isShowSignUpSection &&
					<SignUpSection setIsShowSignUpSection={setIsShowSignUpSection} />
				}
			</div>
		</URLModal>
	)
}

export default SignInScreen