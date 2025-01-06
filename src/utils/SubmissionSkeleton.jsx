import Skeleton from "react-loading-skeleton";
const SubmissionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: 6 }).map((_, index) => (
				<div
					key={index}
					className="bg-white shadow-md rounded-lg overflow-hidden p-4"
				>
					<div className="mb-2">
						<Skeleton height={20} width="70%" />
					</div>
					<div className="mb-4">
						<Skeleton
							count={3}
							height={15}
							style={{ marginBottom: "0.5rem" }}
						/>
					</div>
					<div className="flex justify-between items-center">
						<Skeleton height={15} width="40%" />
						<Skeleton height={30} width="30%" />
					</div>
				</div>
			))}
		</div>
	);
};

export default SubmissionSkeleton;
