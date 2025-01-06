import InputField from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { apiHelper } from "../services/api-actions";
import { login } from "../store/authSlice";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
	username: z.string().nonempty({ message: "Username is required" }),
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

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data) => apiHelper.post(`/login/`, data),
		onSuccess: (response) => {
			toast.success("Signed in successfully", { autoClose: 3000 });
			reset();
			dispatch(login(response.data));
			navigate("/home", { replace: true });
		},
		onError: (error) => {
			toast.error("Failed to sign in", { autoClose: 3000 });
			console.log(error);
		},
	});

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "linear" }}
				className="bg-white shadow-lg rounded-lg p-8 w-11/12 sm:w-2/3 md:w-1/3"
			>
				<h1 className="text-black text-3xl font-bold mb-4">Welcome Back</h1>
				<p className="text-gray-500 text-sm my-4">
					Don&apos;t have an account?{" "}
					<Link
						className="text-primaryBlue hover:underline focus:outline-none focus:ring-2 focus:ring-primaryBlue"
						to="/signup"
					>
						Sign Up
					</Link>
				</p>
				<p className="text-gray-500 mb-6">Fill in your details to log in</p>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<InputField
						htmlFor="username"
						label="Username"
						icon={<FaUser size={16} color="#007bff" />}
						type="text"
						{...register("username")}
						error={errors.username?.message}
						placeholder="Enter your Username"
					/>
					<PasswordInput
						htmlFor="Password"
						label="Password"
						type={isPasswordVisible ? "text" : "password"}
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
					<Button
						disabled={isPending}
						className="w-full rounded-lg bg-primaryBlue p-2 text-white text-sm mt-4"
					>
						{isPending ? "Signing in..." : "Sign In"}
					</Button>
				</form>
			</motion.div>
		</div>
	);
};

export default Login;
