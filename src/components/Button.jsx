import PropTypes from "prop-types";

export default function Button({ children, className, disabled, ...props }) {
	return (
		<div>
			<button
				disabled={disabled}
				type="submit"
				className={
					className
						? className
						: "w-full p-2 bg-primaryBlue text-white rounded-md hover:bg-blue-800 cursor-pointer transition-all ease-in-out duration-200"
				}
				{...props}
			>
				{children}
			</button>
		</div>
	);
}

Button.propTypes = {
	children: PropTypes.element.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
};
