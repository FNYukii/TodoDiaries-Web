import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../../utils/firebase"
import AuthService from "../../../utils/AuthService"

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
		<div className="p-2">

			<p>UID: {uid ?? "Null"}</p>

			<div className="flex space-x-4">
				<button onClick={() => AuthService.signInWithGoogle()} className="font-bold disabled:text-slate-400" disabled={uid !== null}>Sign In</button>
				<button onClick={() => AuthService.signOut()} className="text-red-500 font-bold disabled:text-slate-400" disabled={uid === null}>Sign Out</button>
			</div>

		</div>
	)
}

export default AuthStateChecker