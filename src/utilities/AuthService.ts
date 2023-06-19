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

	static uidFromLocalStorage(): string | null {

		// Reactページ生成直後はAuthからUIDを取得できないので、LocalStorageから取得する
		const uid = localStorage.getItem('uid')
		return uid
	}

	static email(): string | null {

		const email = auth.currentUser?.email
		if (!email) return null

		return email
	}

	static async signInWithGoogle(): Promise<string | null> {

		const provider = new GoogleAuthProvider()

		return signInWithPopup(auth, provider)
			.then((result) => {

				// Google APIにアクセスするために、Googleアクセストークンを取得
				// const credential = GoogleAuthProvider.credentialFromResult(result)
				// const token = credential.accessToken

				// サインインしたユーザーのUIDを取得
				const uid = result.user.uid

				// LocalStorageにUIDを保存
				localStorage.setItem('uid', uid)

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
				// LocalStorageに保存していたUIDの値を削除
				localStorage.removeItem('uid')

				return uid
			})
			.catch((error) => {

				console.log(`Failed to sign out. ${error}`)
				return null
			})
	}
}

export default AuthService