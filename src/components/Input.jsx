import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputField = forwardRef(
	({ htmlFor, label, icon, type, error, className, ...props }, ref) => {
		return (
			<div className="text-sm flex flex-col gap-1">
				<label htmlFor={htmlFor} className="text-xs">
					{label}
				</label>
				<div
					className={`flex md:w-full bg-gray-100 focus-within:ring-1 focus-within:ring-primaryBlue focus-within:bg-white px-2 py-2.5 rounded-xl ${
						error && "focus-within:ring-red-500"
					}`}
				>
					<input
						className={
							className
								? className
								: `text-xs px-2 flex-1 bg-transparent outline-none`
						}
						type={type || "email"}
						{...props}
						style={{ backgroundColor: "transparent" }}
						ref={ref}
					/>
					{icon}
				</div>
				{error && <p className="text-red-500 text-xs">{error}</p>}
			</div>
		);
	}
);

InputField.displayName = "InputField";

export default InputField;

InputField.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	type: PropTypes.string,
	error: PropTypes.any,
	className: PropTypes.string,
};
