import { Routes, Route, useLocation } from "react-router-dom"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import SignInScreen from "./views/screens/SignInScreen"
import HomeScreen from "./views/screens/HomeScreen"
import WelcomeScreen from "./views/screens/WelcomeScreen"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "./utilities/firebase"
import AccountScreen from "./views/screens/AccountScreen"
import CreateTodoScreen from "./views/screens/CreateTodoScreen"
import EditTodoScreen from "./views/screens/EditTodoScreen"
import NKeyupNavigator from "./views/components/others/NKeyupNavigator"
import SplashScreen from "./views/screens/SplashScreen"

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
	const [isLoaded, setIsLoaded] = useState(false)

	// ログイン状態を監視
	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			if (user) {

				// ログイン済み
				setIsSignedIn(true)
			} else {

				// 未ログイン
				setIsSignedIn(false)
			}

			setIsLoaded(true)
		})
	}, [])

	return (
		<div>

			{!isLoaded &&
				<SplashScreen />
			}

			{isLoaded && !isSignedIn &&

				<div>

					<Routes location={isShowModal ? previousPath : currentPath}>

						<Route path="/" element={<WelcomeScreen />} />
						<Route path="*" element={<NotFoundScreen />} />
					</Routes>

					<Routes location={isShowModal ? currentPath : ""}>

						<Route path="/sign-in" element={<SignInScreen />} />
						<Route path="/new" element={<NotFoundScreen onForeground />} />
						<Route path="/todos/:todoId" element={<NotFoundScreen onForeground />} />
						<Route path="/account" element={<NotFoundScreen onForeground />} />
						<Route path='*' element={<div />} />
					</Routes>
				</div>
			}

			{isLoaded && isSignedIn &&

				<div>

					<Routes location={isShowModal ? previousPath : currentPath}>

						<Route path="/" element={<HomeScreen />} />
						<Route path="*" element={<NotFoundScreen />} />
					</Routes>

					<Routes location={isShowModal ? currentPath : ""}>

						<Route path="/" element={<NKeyupNavigator />} />

						<Route path="/sign-in" element={<NotFoundScreen onForeground />} />
						<Route path="/new" element={<CreateTodoScreen />} />
						<Route path="/todos/:todoId" element={<EditTodoScreen />} />
						<Route path="/account" element={<AccountScreen />} />
						<Route path='*' element={<div />} />
					</Routes>
				</div>
			}
		</div>
	)
}

export default App