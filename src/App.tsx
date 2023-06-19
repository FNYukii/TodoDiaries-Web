import { Routes, Route, useLocation } from "react-router-dom"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import SignInScreen from "./views/screens/SignInScreen"
import HomeScreen from "./views/screens/HomeScreen"
import WelcomeScreen from "./views/screens/WelcomeScreen"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "./utilities/firebase"
import AccountScreen from "./views/screens/AccountScreen"
import AuthService from "./utilities/AuthService"

function App() {

	// 現在のアドレスバーのパスを取得
	const location = useLocation()
	const currentPath = location.pathname

	// ひとつ前のページのURLを取得。無いなら"/""
	const state = location.state as { from?: string }
	const previousPath: string | undefined = state?.from ?? "/"

	// モーダル系の画面にアクセスされたら、変数isShowModalをtrueとする
	const isShowSignInModal = currentPath === "/sign-in"
	const isShowCreateTodoModal = currentPath === "/new-todo"
	const isShowTodoModal = currentPath.match(/^\/todos\/\w{20}\$/)
	const isShowAccountModal = currentPath === "/account"
	const isShowModal = isShowSignInModal || isShowCreateTodoModal || isShowTodoModal || isShowAccountModal ? true : false

	// ログイン状態
	const [isSignedIn, setIsSignedIn] = useState(false)

	// ログイン状態を監視
	useEffect(() => {

		// Auth初期化前はAuthStateを取得できないので、それまではLocalStorageに保存しておいたUIDを確認
		const uid = AuthService.uidFromLocalStorage()
		if (uid) {
			setIsSignedIn(true)
		}

		onAuthStateChanged(auth, (user) => {
			if (user) {

				// ログイン済み
				setIsSignedIn(true)

			} else {

				// 未ログイン
				setIsSignedIn(false)
			}
		})
	}, [])

	return (
		<div className="dark:text-white">

			<Routes location={isShowModal ? previousPath : currentPath}>

				<Route path="/" element={isSignedIn ? <HomeScreen /> : <WelcomeScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>

			<Routes location={isShowModal ? currentPath : ""}>

				<Route path="/sign-in" element={isSignedIn ? <NotFoundScreen className="z-30 fixed top-0 left-0 w-full h-full bg-white dark:bg-black" /> : <SignInScreen />} />
				<Route path="/account" element={isSignedIn ? <AccountScreen /> : <NotFoundScreen className="z-30 fixed top-0 left-0 w-full h-full bg-white dark:bg-black" />} />
				<Route path='*' element={<div />} />
			</Routes>
		</div>
	)
}

export default App