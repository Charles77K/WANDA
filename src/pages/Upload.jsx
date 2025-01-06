import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axiosInstance from "../services/api-actions";
import { queryClient } from "../services/tanstack";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Upload = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: (data) =>
			axiosInstance.post("/submissions/", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}),
		mutationKey: ["submissions"],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["submissions"],
			});
			toast.success("Submission successfully created");
			navigate("/home");
			reset();
		},
		onError: (err) => {
			toast.error(err.response?.data?.file?.[0] || "Error creating submission");
			console.error("Error:", err.response?.data || err.message);
		},
	});

	const validateFile = (file) => {
		const maxSize = 10 * 1024 * 1024; // 5MB
		const allowedTypes = [
			"application/pdf",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"image/jpeg",
			"image/png",
		];

		if (!file) {
			return "File is required.";
		}

		if (!allowedTypes.includes(file.type)) {
			return "Only PDF, JPEG, DOCX, or PNG files are allowed.";
		}

		if (file.size > maxSize) {
			return "File size must not exceed 10MB.";
		}

		return true; // File is valid
	};

	const onSubmit = (formData) => {
		console.log("FormData:", formData);
		const file = formData.file[0]; // if it's an array
		console.log("File to upload:", file);

		// Ensure the file handling works
		if (!file) {
			toast.error("No file selected!");
			return;
		}

		const isFileValid = validateFile(file);
		if (isFileValid !== true) {
			toast.error(isFileValid);
			return;
		}

		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		data.append("file", file);
		console.log("FormData contents:", data);

		mutate(data);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">
				Submit Your Work
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Title */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						{...register("title", { required: "Title is required" })}
						className={`w-full mt-2 text-sm p-3 border rounded-lg ${
							errors.title ? "border-red-500" : "border-gray-300"
						} focus:outline-none focus:ring-2 focus:ring-blue-500`}
						placeholder="Enter the title of your submission"
					/>
					{errors.title && (
						<p className="text-red-500 text-sm">{errors.title.message}</p>
					)}
				</div>

				{/* Description */}
				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						id="description"
						{...register("description", {
							required: "Description is required",
							minLength: {
								value: 10,
								message: "Minimum 10 characters required",
							},
						})}
						className={`w-full text-sm mt-2 p-3 border rounded-lg ${
							errors.description ? "border-red-500" : "border-gray-300"
						} focus:outline-none focus:ring-2 focus:ring-blue-500`}
						placeholder="Write a brief description..."
						rows={5}
					/>
					{errors.description && (
						<p className="text-red-500 text-sm">{errors.description.message}</p>
					)}
				</div>

				{/* File Upload */}
				<div>
					<label
						htmlFor="file"
						className="block text-sm font-medium text-gray-700"
					>
						Upload File
					</label>
					<input
						type="file"
						id="file"
						{...register("file", { required: "Please upload a file" })}
						className={`w-full mt-2 p-3 border rounded-lg ${
							errors.file ? "border-red-500" : "border-gray-300"
						} focus:outline-none focus:ring-2 focus:ring-blue-500`}
					/>
					{errors.file && (
						<p className="text-red-500 text-sm">{errors.file.message}</p>
					)}
				</div>
				{/* Submit Button */}
				<div className="flex">
					<button
						type="submit"
						className="px-12 py-2 bg-primaryBlue text-white font-medium rounded-xl hover:bg-blue-700 transition duration-300"
					>
						{isPending ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Upload;
