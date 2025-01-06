import { motion } from "motion/react"; // Updated import to Framer Motion
import { FaUserPlus, FaUpload, FaSearch, FaEdit } from "react-icons/fa"; // Importing icons

const ListImage = () => {
	return (
		<motion.div
			className="flex flex-col md:flex-row p-8 items-center md:p-12 rounded-lg shadow-lg"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			id="usage"
		>
			{/* Left Image */}
			<motion.div
				className="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-8"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<img
					src="/illustration.jpg"
					alt="Example"
					className="rounded-xl w-full h-auto object-cover shadow-lg border border-gray-300"
				/>
			</motion.div>
			{/* Right Text */}
			<div className="md:w-1/2 text-gray-800 space-y-10">
				{/* Section 1 */}
				<motion.div
					className="flex items-start space-x-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					<FaUserPlus className="text-blue-500 text-3xl" />
					<div>
						<h2 className="text-2xl font-bold text-blue-700 mb-2">
							Create an Account
						</h2>
						<p className="text-base leading-relaxed">
							Sign up to get started with your academic journey. Access a world
							of opportunities by creating a free account and connecting with a
							global research community.
						</p>
					</div>
				</motion.div>

				{/* Section 2 */}
				<motion.div
					className="flex items-start space-x-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<FaUpload className="text-blue-500 text-3xl" />
					<div>
						<h2 className="text-2xl font-bold text-blue-700 mb-2">
							Upload Your Thesis
						</h2>
						<p className="text-base leading-relaxed">
							Share your hard work and discoveries with the community. Upload
							your research to inspire others and get valuable feedback.
						</p>
					</div>
				</motion.div>

				{/* Section 3 */}
				<motion.div
					className="flex items-start space-x-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<FaSearch className="text-blue-500 text-3xl" />
					<div>
						<h2 className="text-2xl font-bold text-blue-700 mb-2">
							Explore and Learn
						</h2>
						<p className="text-base leading-relaxed">
							Dive into a vast repository of knowledge. Browse through approved
							theses to enhance your understanding and spark your creativity.
						</p>
					</div>
				</motion.div>

				{/* Section 4 */}
				<motion.div
					className="flex items-start space-x-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<FaEdit className="text-blue-500 text-3xl" />
					<div>
						<h2 className="text-2xl font-bold text-blue-700 mb-2">
							Manage Your Work
						</h2>
						<p className="text-base leading-relaxed">
							Stay in control of your research. Edit or delete your submissions
							anytime with our easy-to-use tools.
						</p>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ListImage;
