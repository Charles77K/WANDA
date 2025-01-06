import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SubPageSkeleton = () => {
	return (
		<div className="rounded-xl p-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-xl max-w-4xl mx-auto my-12">
			<div className="flex gap-5 justify-between mb-6">
				<Skeleton width={150} height={30} />
				<div className="flex gap-2">
					<Skeleton circle width={40} height={40} />
					<Skeleton circle width={40} height={40} />
				</div>
			</div>
			<div className="text-center mb-8">
				<Skeleton width="75%" height={32} />
				<Skeleton width="60%" height={24} />
			</div>
			<div className="flex justify-center mb-6">
				<Skeleton width={180} height={48} borderRadius={8} />
			</div>
			<div className="text-center text-gray-600 text-sm">
				<Skeleton width={160} height={16} />
				<Skeleton width={120} height={16} />
			</div>
		</div>
	);
};

export default SubPageSkeleton;
