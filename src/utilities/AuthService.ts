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