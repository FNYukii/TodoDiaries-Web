import { Routes, Route } from "react-router-dom"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import SignInScreen from "./views/screens/SignInScreen"
import HomeScreen from "./views/screens/HomeScreen"
import WelcomeScreen from "./views/screens/WelcomeScreen"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "./utils/firebase"
import AccountScreen from "./views/screens/AccountScreen"
import CreateTodoScreen from "./views/screens/CreateTodoScreen"
import EditTodoScreen from "./views/screens/EditTodoScreen"
import NKeyupNavigator from "./views/components/others/NKeyupNavigator"
import SplashScreen from "./views/screens/SplashScreen"

function App() {

	// ログイン状態
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [is200msPassed, setIs200msPassed] = useState(false)



	// ログイン状態を監視
	useEffect(() => {

		// スプラッシュ画面の最低表示時間を設定
		setTimeout(() => {
			setIs200msPassed(true)
		}, 200);

		// ログイン状態を取得
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

			{(!isLoaded || !is200msPassed) &&
				<SplashScreen />
			}



			{isLoaded && is200msPassed && !isSignedIn &&

				<div>

					<Routes>

						<Route path="/" element={<WelcomeScreen />} />
						<Route path="/sign-in" element={<WelcomeScreen />} />
						<Route path="*" element={<NotFoundScreen />} />
					</Routes>

					<Routes>

						<Route path="/sign-in" element={<SignInScreen />} />
					</Routes>
				</div>
			}



			{isLoaded && is200msPassed && isSignedIn &&

				<div>

					<Routes>

						<Route path="/" element={<HomeScreen />} />

						<Route path="/new" element={<HomeScreen />} />
						<Route path="/todos/:todoId" element={<HomeScreen />} />
						<Route path="/account" element={<HomeScreen />} />

						<Route path="*" element={<NotFoundScreen />} />
					</Routes>

					<Routes>

						<Route path="/" element={<NKeyupNavigator />} />

						<Route path="/new" element={<CreateTodoScreen />} />
						<Route path="/todos/:todoId" element={<EditTodoScreen />} />
						<Route path="/account" element={<AccountScreen />} />
					</Routes>
				</div>
			}
		</div>
	)
}

export default App