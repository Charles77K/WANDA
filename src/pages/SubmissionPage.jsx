import { useParams } from "react-router-dom";
import useFetchData, { queryClient } from "../services/tanstack";
import { FaArrowDown, FaCheck, FaTimes } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/api-actions";
import { toast } from "react-toastify";
import { useState } from "react";
import SubPageSkeleton from "../utils/SubPageSkeleton";
import { useSelector } from "react-redux";
const SubmissionPage = () => {
	const username = useSelector((state) => state.auth.username);
	const { id } = useParams();

	const { data, isError, isLoading } = useFetchData({
		endpoint: `/submissions/${id}`,
		queryKey: ["submissions", id],
		gcTime: 10 * 60 * 60 * 1000,
		staleTime: 10 * 60 * 60 * 1000,
	});

	let err;

	if (username !== "MyAdmin") {
		err = "This action can only be perfomed by the admin";
	}

	// Local loading state for approval/disapproval mutation
	const [isActionPending, setIsActionPending] = useState(false);

	const disapproveMutation = useMutation({
		mutationFn: () => axiosInstance.post(`/submissions/${id}/disapprove/`),
		onSuccess: () => {
			queryClient.invalidateQueries(["submissions", id]);
			toast.info("Submission disapproved");
			setIsActionPending(false); // Stop the spinner when the action is complete
		},
		onError: () => {
			toast.error(err, {
				autoClose: 2000,
			});
			setIsActionPending(false); // Stop the spinner if there's an error
		},
	});

	const approveMutation = useMutation({
		mutationFn: () => axiosInstance.post(`/submissions/${id}/approve/`),
		onSuccess: () => {
			queryClient.invalidateQueries(["submissions", id]);
			toast.info("Submission approved", {
				autoClose: 2000,
			});
			setIsActionPending(false); // Stop the spinner when the action is complete
		},
		onError: () => {
			toast.error(err, {
				autoClose: 2000,
			});
			setIsActionPending(false); // Stop the spinner if there's an error
		},
	});

	const handleDisapprove = () => {
		setIsActionPending(true); // Show the spinner while disapproving
		disapproveMutation.mutate();
	};

	const handleApprove = () => {
		setIsActionPending(true); // Show the spinner while approving
		approveMutation.mutate();
	};

	const downloadFile = (fileUrl) => {
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileUrl.split("/").pop();
		link.click();
	};

	const style =
		data?.status === "Pending"
			? "text-gray-500"
			: data?.status === "Approved"
			? "text-green-500"
			: "text-red-500";

	let content;

	if (isLoading) {
		// Skeleton loader for the main content
		content = (
			<div className="h-screen">
				<SubPageSkeleton />;
			</div>
		);
	}

	if (isError) {
		content = (
			<div className="flex items-center justify-center text-lg text-red-500">
				An error occurred
			</div>
		);
	}

	if (data) {
		content = (
			<div className="rounded-xl p-10 bg-gradient-to-r from-blue-100 to-blue-200 shadow-xl max-w-4xl mx-auto my-12">
				<div className="flex gap-5 justify-between mb-6">
					<p className="text-lg font-semibold">
						Status: <span className={style}>{data.status}</span>
					</p>
					<div className="flex gap-2">
						<button
							onClick={handleDisapprove}
							disabled={isActionPending} // Disable buttons when action is pending
							className="relative group p-3 bg-red-600 hover:bg-red-700 rounded-full transition-all shadow-lg hover:shadow-2xl"
						>
							{disapproveMutation.isPending ? (
								<div className="flex justify-center space-x-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-200"></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-400"></div>
								</div>
							) : (
								<FaTimes color="white" size={20} />
							)}
							<p className="group-hover:flex absolute hidden top-10 bg-black text-white py-1 px-3 text-xs rounded-md">
								Disapprove
							</p>
						</button>
						<button
							onClick={handleApprove}
							disabled={isActionPending} // Disable buttons when action is pending
							className="relative group p-3 bg-green-600 hover:bg-green-700 rounded-full transition-all shadow-lg hover:shadow-2xl"
						>
							{approveMutation.isPending ? (
								<div className="flex justify-center space-x-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-200"></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-400"></div>
								</div>
							) : (
								<FaCheck color="white" size={20} />
							)}
							<p className="group-hover:flex absolute hidden top-10 bg-black text-white py-1 px-3 text-xs rounded-md">
								Approve
							</p>
						</button>
					</div>
				</div>
				<div className="text-center mb-8">
					<h1 className="text-3xl font-extrabold text-gray-800 mb-3">
						{data.title}
					</h1>
					<p className="text-lg text-gray-700 mb-6">{data.description}</p>
				</div>
				<div className="flex justify-center mb-6">
					<button
						onClick={() => downloadFile(data.file)}
						className="bg-primaryBlue text-white rounded-lg py-3 px-6 flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg hover:shadow-2xl"
					>
						<FaArrowDown size={25} />
						<span className="ml-2 text-xl">Download</span>
					</button>
				</div>
				<div className="text-center text-gray-600 text-sm">
					<p>
						Submitted by: <strong>{data.username}</strong>
					</p>
					<p>{new Date(data.created_at).toLocaleString()}</p>
				</div>
			</div>
		);
	}

	return <div className="p-12 min-h-screen">{content}</div>;
};

export default SubmissionPage;
