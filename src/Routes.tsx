import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundScreen from "./screens/NotFoundScreen";
import TopScreen from "./screens/TopScreen";

function Routes() {

	const router = createBrowserRouter([
		{ path: "/", element: <TopScreen />, errorElement: <NotFoundScreen /> },
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	)
}

export default Routes