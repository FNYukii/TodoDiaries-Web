import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../../utilities/firebase"
import AuthService from "../../../utilities/AuthService"

function AuthStateChecker() {

	const [uid, setUid] = useState<string | null>(null)


	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			if (user) {

				// ログイン済み
				const uid = user.uid
				setUid(uid)

			} else {

				// 未ログイン
				setUid(null)
			}
		})
	}, [])

	return (
		<div>
			<p>UID: {uid ?? "Null"}</p>

			<button onClick={() => AuthService.signOut()} className="text-red-500 font-bold" disabled={uid === null}>Sign out</button>
		</div>
	)
}

export default AuthStateChecker