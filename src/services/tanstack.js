import { QueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance from "./api-actions";

export const queryClient = new QueryClient();

export const useFetchData = ({
	queryKey,
	endpoint,
	staleTime = 0,
	gcTime = 0,
}) => {
	const { data, isLoading, isError } = useQuery({
		queryKey,
		queryFn: ({ signal }) => axiosInstance.get(endpoint, { signal }),
		retry: 2,
		staleTime,
		gcTime,
		select: (data) => data.data,
	});

	return { data, isLoading, isError };
};

export default useFetchData;
