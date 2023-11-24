import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

class AuthService {

	static uid(): Promise<string | null> {

		return new Promise((resolve) => {

			var unsubscribe = auth.onAuthStateChanged((user) => {

				// UIDをresolve
				const uid = user?.uid ?? null

				resolve(uid)

				// 登録解除
				unsubscribe()
			})
		})
	}

	static email(): string | null {

		const user = auth.currentUser
		if (!user) return null

		const email = user.email
		if (!email) return null

		return email
	}

	static async signInWithGoogle(): Promise<string | null> {

		const provider = new GoogleAuthProvider()

		return signInWithPopup(auth, provider)
			.then((result) => {
				
				// サインインしたユーザーのUIDを取得
				const uid = result.user.uid

				// UIDを返す
				return uid

			}).catch((error) => {

				// エラーの詳細
				const errorCode = error.code
				const errorMessage = error.message
				const email = error.customData.email

				console.log(`Fail! Error to sign in. ${errorCode}, ${errorMessage}, ${email}`)

				return null
			})
	}

	static async signOut(): Promise<string | null> {

		const uid = this.uid()

		// 未ログイン状態なら終了
		if (uid === null) {
			return null
		}

		// サインアウト実行
		return auth.signOut()
			.then(() => {

				// 成功
				return uid
			})
			.catch((error) => {

				console.log(`Failed to sign out. ${error}`)
				return null
			})
	}
}

export default AuthService