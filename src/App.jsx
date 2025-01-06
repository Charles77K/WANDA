import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/tanstack";

const AppRoutes = () => {
	const element = useRoutes(routesConfig);
	return element;
};
function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Router>
					<ToastContainer />
					<AppRoutes />
				</Router>
			</QueryClientProvider>
		</>
	);
}

export default App;
