import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchData from "../services/tanstack";
import SubmissionSkeleton from "../utils/SubmissionSkeleton";
import { FaArrowRight } from "react-icons/fa";
import SelectInput from "../components/SelectInput";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [statusFilter, setStatusFilter] = useState("All");

	const { data, isError, isLoading, refetch } = useFetchData({
		endpoint:
			statusFilter === "All"
				? "/submissions"
				: `/submissions?status=${statusFilter.toLowerCase()}`,
		queryKey: ["submissions", statusFilter],
		gcTime: 10 * 60 * 60 * 1000,
		staleTime: 10 * 60 * 60 * 1000,
	});

	useEffect(() => {
		// Filter by search query
		if (!searchQuery.trim()) {
			setFilteredResults(data);
		} else {
			setIsSearching(true);
			const results = data?.filter(
				(item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredResults(results);
			setIsSearching(false);
		}
	}, [searchQuery, data]);

	const handleStatusChange = (e) => {
		setStatusFilter(e.target.value);
		refetch(); // Refetch data when the status filter changes
	};

	const renderContent = (items) => (
		<div className="container mx-auto p-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{items.map((item) => (
					<Link
						to={`/home/${item.id}`}
						key={item.id}
						className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
					>
						<div className="p-6">
							{/* Thesis Title */}
							<section className="flex items-center justify-between mb-4">
								<h3 className="text-2xl font-semibold text-gray-900 line-clamp-2">
									{item.title}
								</h3>
								<p
									className={`text-sm ${
										item.status === "Pending"
											? "text-gray-500"
											: item.status === "Approved"
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{item.status}
								</p>
							</section>

							{/* Thesis Description */}
							<p className="text-gray-700 mb-4 line-clamp-3">
								{item.description}
							</p>

							{/* Username and Date */}
							<div className="flex justify-between items-center text-sm text-gray-500">
								<p>By: {item.username}</p>
								<p>{new Date(item.created_at).toLocaleString()}</p>
							</div>

							{/* Read More Button */}
							<div className="mt-4 flex items-center gap-2">
								<button className="text-blue-600 text-sm font-medium">
									Read More
								</button>
								<FaArrowRight size={12} color="blue" />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);

	return (
		<div className="mt-10">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">
					Submissions Dashboard
				</h1>
				<p className="text-gray-600">
					Browse through the latest submissions from users.
				</p>
				<div className="mt-4">
					<input
						type="text"
						className="border border-gray-300 outline-none rounded-l-lg px-4 py-2 w-1/4"
						placeholder="Search submissions..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800"
						onClick={() => setSearchQuery("")}
					>
						Clear
					</button>
				</div>

				{/* Status Filter */}
				<div className="mt-4">
					<SelectInput
						options={["All", "Approved", "Pending", "Disapproved"]}
						value={statusFilter}
						onChange={handleStatusChange}
						style={"w-1/4 bg-white border border-gray-300 rounded-md p-2"}
						label="Filter by Status"
						name="statusFilter"
						optionValue={(option) => option}
						optionMain={(option) => option}
						isLoading={isLoading}
						isError={isError}
					/>
				</div>
			</div>

			{isSearching && (
				<div className="flex justify-center items-center h-screen">
					<p className="text-lg text-blue-600">Searching...</p>
				</div>
			)}

			{filteredResults && filteredResults.length > 0 ? (
				renderContent(filteredResults)
			) : isLoading ? (
				<div className="h-screen p-12">
					<SubmissionSkeleton />
				</div>
			) : isError ? (
				<div className="flex justify-center items-center h-screen">
					<p className="text-lg text-red-500">Error loading submissions</p>
				</div>
			) : data && data.length > 0 ? (
				renderContent(data)
			) : (
				<div className="flex flex-col justify-center items-center h-screen">
					<p className="text-lg text-gray-700">No submissions found</p>
					<Link
						to="/home/upload"
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
					>
						Add Submission
					</Link>
				</div>
			)}
		</div>
	);
};

export default Home;
