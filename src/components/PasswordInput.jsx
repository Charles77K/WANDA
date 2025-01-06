import PropTypes from "prop-types";
import { forwardRef } from "react";

const PasswordInput = forwardRef(
	({ htmlFor, label, icon, type, icon2, onClick, error, ...props }, ref) => {
		return (
			<div className="text-sm flex flex-col gap-1">
				<label htmlFor={htmlFor} className="text-xs">
					{label}
				</label>
				<div
					className={`flex w-full bg-gray-100 focus-within:ring-1 focus-within:ring-primaryBlue focus-within:bg-white px-2 py-2.5 rounded-xl ${
						error && "focus-within:ring-red-500"
					}`}
				>
					{icon}
					<input
						className="text-xs px-2 flex-1 bg-transparent outline-none"
						type={type || "text"}
						{...props}
						ref={ref}
						required
					/>
					<div onClick={onClick} className="cursor-pointer">
						{icon2}
					</div>
				</div>
				{error && <p className="text-red-500 text-xs">{error}</p>}
			</div>
		);
	}
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

PasswordInput.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	icon: PropTypes.element,
	icon2: PropTypes.element.isRequired,
	type: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	error: PropTypes.string,
};
