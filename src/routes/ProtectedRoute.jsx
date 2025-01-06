import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
	const authToken = localStorage.getItem("token"); // Or your method of checking auth

	if (!authToken) {
		toast.info("token not found please login and try again", {
			autoClose: 2000,
		});
		return <Navigate to="/login" replace />; // Redirect to login if not authenticated
	}
	return children; // Render the protected component if authenticated
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
