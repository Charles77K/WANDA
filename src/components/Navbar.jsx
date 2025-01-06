import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaPowerOff, FaTimes, FaUpload, FaClipboardList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../ui/LogoutModal";
import { logout } from "../store/authSlice";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [IsModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const username = useSelector((state) => state.auth.user);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsModalOpen(false);
		navigate("/login", { replace: true });
	};

	return (
		<nav className="w-full bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
			<div className="flex justify-between items-center px-6 py-4">
				{/* Logo Section */}
				<Link to={"/"} className="flex items-center space-x-3">
					<div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
						<p className="text-white font-bold text-2xl">W</p>
					</div>
					<p className="text-blue-900 font-semibold text-xl tracking-wide">
						Wanda
					</p>
				</Link>

				{/* Hamburger Menu */}
				<div className="md:hidden flex items-center" onClick={toggleMenu}>
					{isMenuOpen ? (
						<FaTimes size={25} className="text-blue-900" />
					) : (
						<BiMenu size={30} className="text-blue-900" />
					)}
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex items-center space-x-8">
					{isLoggedIn ? (
						<>
							<Link
								to="/home/upload"
								className="flex items-center text-blue-900 hover:text-blue-600 hover:font-semibold font-medium transition duration-300"
							>
								<FaUpload className="mr-2" />
								Upload
							</Link>
							<Link
								to="/home"
								className="flex items-center text-blue-900 hover:text-blue-600 font-medium transition duration-300"
							>
								<FaClipboardList className="mr-2" />
								Submissions
							</Link>
						</>
					) : (
						<>
							<Link
								to={"/login"}
								className="px-4 py-1 border border-blue-600 text-blue-900 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
							>
								Login
							</Link>
						</>
					)}
				</div>

				{/* User Section */}
				{isLoggedIn && (
					<div className="hidden md:flex items-center space-x-6">
						<p className="text-blue-900">
							Welcome,{" "}
							<span className="font-semibold text-blue-600">{username}</span>
						</p>
						<button
							onClick={() => setIsModalOpen(true)}
							className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition duration-300"
						>
							<FaPowerOff />
						</button>
					</div>
				)}
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: "auto" }}
					className="md:hidden bg-white shadow-lg py-4 px-6"
				>
					{isLoggedIn ? (
						<>
							<button
								onClick={() => setIsModalOpen(true)}
								className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition duration-300"
							>
								<FaPowerOff />
							</button>
							<Link
								to="/home/upload"
								className="block mt-4 text-blue-900 hover:text-blue-600 font-medium transition duration-300"
								onClick={() => setIsMenuOpen(false)} // Close menu on click
							>
								Upload
							</Link>
							<Link
								to="/home"
								className="block mt-2 text-blue-900 hover:text-blue-600 font-medium transition duration-300"
								onClick={() => setIsMenuOpen(false)} // Close menu on click
							>
								Submissions
							</Link>
						</>
					) : (
						<>
							<Link
								onClick={() => setIsMenuOpen(false)}
								to="/login"
								className="px-4 py-2 bg-blue-50 text-blue-900 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
							>
								Login
							</Link>
						</>
					)}
				</motion.div>
			)}
			{IsModalOpen && (
				<LogoutModal
					noText="Cancel"
					onCancel={() => setIsModalOpen(false)}
					onNo={() => setIsModalOpen(false)}
					onYes={handleLogout}
					yesText="Logout"
					title="Are you sure you want to logout?"
				/>
			)}
		</nav>
	);
};

export default Navbar;
