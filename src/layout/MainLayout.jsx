import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Landing/Footer";

const MainLayout = () => {
	return (
		<main className="min-h-screen flex flex-col justify-between">
			<Navbar />
			<div>
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export default MainLayout;
