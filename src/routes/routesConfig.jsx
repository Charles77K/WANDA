import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SubmissionPage from "../pages/SubmissionPage";
import Submissions from "../pages/Submissions";
import Upload from "../pages/Upload";
import ProtectedRoute from "./ProtectedRoute";

const routesConfig = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Landing /> },
			{ path: "login", element: <Login /> },
			{ path: "signup", element: <SignUp /> },
			{
				path: "home",
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "home/upload",
				element: (
					<ProtectedRoute>
						<Upload />
					</ProtectedRoute>
				),
			},
			{
				path: "home/submission",
				element: (
					<ProtectedRoute>
						<Submissions />
					</ProtectedRoute>
				),
			},
			{
				path: "home/:id",
				element: (
					<ProtectedRoute>
						<SubmissionPage />
					</ProtectedRoute>
				),
			},
		],
	},
];

export default routesConfig;
