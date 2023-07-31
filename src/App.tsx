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
import CreateTodoScreen from "./views/screens/CreateTodoScreen"
import EditTodoScreen from "./views/screens/EditTodoScreen"

function App() {

	// 現在のアドレスバーのパスを取得
	const location = useLocation()
	const currentPath = location.pathname

	// ひとつ前のページのURLを取得。無いなら"/""
	const state = location.state as { from?: string }
	const previousPath: string | undefined = state?.from ?? "/"

	// モーダル系の画面にアクセスされたら、変数isShowModalをtrueとする
	const isShowSignInModal = currentPath === "/sign-in"
	const isShowCreateTodoModal = currentPath === "/new"
	const isShowEditTodoModal: boolean = /^\/todos\/[A-Za-z0-9]{1,}/.test(currentPath)
	const isShowAccountModal = currentPath === "/account"
	const isShowModal = isShowSignInModal || isShowCreateTodoModal || isShowEditTodoModal || isShowAccountModal ? true : false

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

				<Route path="/sign-in" element={isSignedIn ? <NotFoundScreen onForeground /> : <SignInScreen />} />
				<Route path="/new" element={isSignedIn ? <CreateTodoScreen /> : <NotFoundScreen onForeground />} />
				<Route path="/todos/:todoId" element={isSignedIn ? <EditTodoScreen /> : <NotFoundScreen onForeground />} />
				<Route path="/account" element={isSignedIn ? <AccountScreen /> : <NotFoundScreen onForeground />} />
				<Route path='*' element={<div />} />
			</Routes>
		</div>
	)
}

export default App