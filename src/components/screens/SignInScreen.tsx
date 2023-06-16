import { useState } from "react";
import Modal from "../others/Modal";
import SignInSection from "../sections/SignInSection";
import SignUpSection from "../sections/SignUpSection";

function SignInScreen() {

	const [isShowSignUpSection, setIsShowSignUpSection] = useState(false)

	return (

		<Modal title="サインイン - Meetings">

			<div>
				
				{!isShowSignUpSection &&
					<SignInSection setIsShowSignUpSection={setIsShowSignUpSection} />
				}

				{isShowSignUpSection &&
					<SignUpSection setIsShowSignUpSection={setIsShowSignUpSection} />
				}
			</div>
		</Modal>
	)
}

export default SignInScreen;