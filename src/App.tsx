import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundScreen from "./views/screens/NotFoundScreen";
import SignInScreen from "./views/screens/SignInScreen";
import TopScreen from "./views/screens/TopScreen";

function App() {

	// 現在のアドレスバーのパスを取得
	const location = useLocation()
	const currentPath = location.pathname

	// モーダル系の画面にアクセスされたら、変数isShowModalをtrueとする
	const isShowSignInModal = currentPath === "/sign-in"
	const isShowCreateTodoModal = currentPath === "/new-todo"
	const isShowTodoModal = currentPath.match(/^\/todos\/\w{20}\$/)
	const isShowModal = isShowSignInModal || isShowCreateTodoModal || isShowTodoModal ? true : false

	return (
		<>

			<Routes location={isShowModal ? "/" : currentPath}>

				<Route path="/" element={<TopScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>

			<Routes location={isShowModal ? currentPath : ""}>

				<Route path="/sign-in" element={<SignInScreen />} />
				<Route path='*' element={<></>} />
			</Routes>
		</>
	);
}

export default App;