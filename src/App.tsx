import { Routes, Route, useLocation } from "react-router-dom"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import SignInScreen from "./views/screens/SignInScreen"
import TopScreen from "./views/screens/TopScreen"
import WelcomeScreen from "./views/screens/WelcomeScreen"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "./utilities/firebase"

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
	const isShowModal = isShowSignInModal || isShowCreateTodoModal || isShowTodoModal ? true : false

	// ログイン状態
	const [isSignedIn, setIsSignedIn] = useState(false)

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
		})
	}, [])

	return (
		<>

			<Routes location={isShowModal ? previousPath : currentPath}>

				<Route path="/" element={isSignedIn ? <TopScreen /> : <WelcomeScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>

			<Routes location={isShowModal ? currentPath : ""}>

				<Route path="/sign-in" element={isSignedIn ? <NotFoundScreen /> : <SignInScreen />} />
				<Route path='*' element={<div />} />
			</Routes>
		</>
	)
}

export default App