import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

class AuthService {

	static uid(): string | null {

		const uid = auth.currentUser?.uid

		if (uid) {
			return uid
		} else {
			return null
		}
	}

	static email(): string | null {

		const email = auth.currentUser?.email
		if (!email) return null

		return email
	}

	static async signInWithGoogle(): Promise<string | null> {

		const provider = new GoogleAuthProvider();

		return signInWithPopup(auth, provider)
			.then((result) => {

				// Google APIにアクセスするために、Googleアクセストークンを取得
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;

				// サインインしたユーザー
				const user = result.user;

				return user.uid

			}).catch((error) => {

				// エラーの詳細
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;

				console.log(`Fail! Error to sign in. ${errorCode}, ${errorMessage}, ${email}`)

				return null
			});
	}

	static async signOut(): Promise<string | null> {

		const uid = this.uid()

		if (uid === null) {
			return null
		}

		return auth.signOut()
			.then(() => {
				return uid
			})
			.catch((error) => {

				console.log(`Failed to sign out. ${error}`)
				return null
			})
	}
}

export default AuthService