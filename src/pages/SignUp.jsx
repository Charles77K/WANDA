import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiHelper } from "../services/api-actions";
import { toast } from "react-toastify";

import PasswordInput from "../components/PasswordInput";
import InputField from "../components/Input";
import Button from "../components/Button";
import { motion } from "motion/react";

const signupSchema = z.object({
	firstname: z.string().nonempty({ message: "First name is required" }),
	lastname: z.string().nonempty({ message: "Last name is required" }),
	username: z.string().nonempty({ message: "Username is required" }),
	email: z
		.string()
		.nonempty({ message: "Email is required" })
		.email({ message: "Please enter a valid email address" }),
	password: z
		.string()
		.nonempty({ message: "Password is required" })
		.min(5, { message: "Password must be at least 5 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must include at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must include at least one lowercase letter",
		})
		.regex(/[0-9]/, { message: "Password must include at least one number" })
		.regex(/[@$!%*?&#]/, {
			message: "Password must include at least one special character",
		}),
});
const SignUp = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signupSchema),
		mode: "onBlur",
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data) => apiHelper.post(`/register/`, data),
		onSuccess: () => {
			toast.success("Signed in successfully", { autoClose: 3000 });
			reset();
			navigate("/login", { replace: true });
		},
		onError: () => {
			toast.error(`Failed to sign in: an error occured}`, {
				autoClose: 3000,
			});
		},
	});

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:px-10 bg-gray-50">
			{/* Header Section */}
			<motion.header
				initial={{ opacity: 0.5, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "linear" }}
				className="text-center mb-6 md:mb-10"
			>
				<h1 className="text-gray-500 text-xs md:text-sm font-semibold tracking-wide uppercase">
					Start for Free
				</h1>
				<h2 className="text-gray-800 text-2xl md:text-4xl font-bold mt-2">
					Create a New Account
				</h2>
				<p className="text-gray-500 text-sm mt-2">
					Already a member?{" "}
					<Link
						className="text-primaryBlue hover:underline focus:outline-none focus:ring-2 focus:ring-primaryBlue"
						to="/login"
					>
						Log In
					</Link>
				</p>
			</motion.header>
			{/* Form Section */}
			<motion.form
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "linear" }}
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg shadow-lg"
				aria-label="Create Account Form"
			>
				{/* First and Last Name Fields */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						htmlFor="firstname"
						label="First Name"
						icon={<FaUser size={14} color="#007bff" />}
						type="text"
						{...register("firstname")}
						error={errors.firstname?.message}
						placeholder="Enter your first name"
					/>
					<InputField
						htmlFor="lastname"
						label="Last Name"
						icon={<FaUser size={14} color="#007bff" />}
						type="text"
						{...register("lastname")}
						error={errors.lastname?.message}
						placeholder="Enter your last name"
					/>
				</div>

				{/* Username and Email */}
				<div className="mt-4 space-y-4">
					<InputField
						htmlFor="username"
						label="Username"
						icon={<FaUser size={14} color="#007bff" />}
						type="text"
						{...register("username")}
						error={errors.username?.message}
						placeholder="Enter your username"
					/>
					<InputField
						htmlFor="email"
						label="Email Address"
						icon={<FaEnvelope size={14} color="#007bff" />}
						type="email"
						{...register("email")}
						error={errors.email?.message}
						placeholder="Enter your email (e.g., example@example.com)"
					/>
				</div>

				{/* Password Field */}
				<div className="mt-4">
					<PasswordInput
						htmlFor="password"
						label="Password"
						type={isPasswordVisible ? "text" : "password"}
						onClick={() => setIsPasswordVisible((prevState) => !prevState)}
						icon2={
							isPasswordVisible ? (
								<FaRegEyeSlash size={16} color="#007bff" />
							) : (
								<FaRegEye size={16} color="#007bff" />
							)
						}
						{...register("password")}
						error={errors.password?.message}
						placeholder="Enter your password"
					/>
				</div>

				{/* Submit Button */}
				<div className="mt-6">
					<Button
						className="w-full py-2 rounded-md bg-primaryBlue text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
						disabled={isPending}
						aria-busy={isPending}
					>
						{isPending ? "Creating..." : "Create Account"}
					</Button>
				</div>
			</motion.form>
		</div>
	);
};

export default SignUp;
