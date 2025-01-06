import axios from "axios";
import { toast } from "react-toastify";

// Utility function to handle errors
export const handleError = (error) => {
	if (axios.isCancel(error)) {
		console.log("Request canceled:", error.message);
	} else if (error.response) {
		// Server responded with a status other than 200 range
		console.error("Server error:", error.response.data || error.message);
		throw new Error(error.response.data || "Server error occurred");
	} else {
		console.error("Network error:", error.message);
		throw new Error("Network error occurred", error.message);
	}
};

const axiosInstance = axios.create({
	baseURL: "https://somto042.pythonanywhere.com",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Function to get the Bearer token from local storage
export const getBearerToken = () => {
	const token = localStorage.getItem("token");
	return token || null; // Return token if it exists; otherwise, return null explicitly.
};

// Attach interceptors
axiosInstance.interceptors.request.use(
	(config) => {
		const bearerToken = getBearerToken(); // Get the Bearer token

		if (bearerToken) {
			config.headers["Authorization"] = `Bearer ${bearerToken}`; // Add Bearer token
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			window.location.href = "/login";
			toast.info("Token has expired, please login and try again");
		}
		return Promise.reject(error);
	}
);

// Create a helper object for API calls
export const apiHelper = {
	get: async (url, params = {}, config = {}) => {
		try {
			return await axiosInstance.get(url, { params, ...config });
		} catch (error) {
			handleError(error);
		}
	},
	post: async (url, data, config = {}) => {
		try {
			return await axiosInstance.post(url, data, { ...config });
		} catch (error) {
			handleError(error);
		}
	},
	put: async (url, data, config = {}) => {
		try {
			return await axiosInstance.put(url, data, { ...config });
		} catch (error) {
			handleError(error);
		}
	},
	delete: async (url, config = {}) => {
		try {
			return await axiosInstance.delete(url, { ...config });
		} catch (error) {
			handleError(error);
		}
	},
};

export default axiosInstance;
