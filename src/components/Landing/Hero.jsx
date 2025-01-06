import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Hero = () => {
	return (
		<motion.div
			className="relative h-screen w-full flex items-center"
			style={{
				backgroundImage: "url(/hero-image.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				// backgroundAttachment: "fixed",
			}}
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 1, ease: "linear" }}
		>
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
				{/* Left Column */}
				<div className="md:w-1/2 flex flex-col gap-10">
					<motion.h1
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="text-4xl md:text-6xl font-extrabold text-primaryCharcoal leading-tight"
					>
						Welcome to <span className="text-primaryBlue">WANDA</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
						className="text-lg md:text-xl text-blue-900"
					>
						Simplify your academic journey with our intuitive platform. Access,
						upload, and explore theses from anywhere.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
					>
						<Link
							to={"/signup"}
							className="bg-primaryBlue hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105"
						>
							Get Started Today
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Hero;
