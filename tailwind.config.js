/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primaryBlue: "#007BFF",
				primaryCharcoal: " #2D2D2D",
				primaryGold: "#FFD700",
				primaryYellow: "#FFCC00",
				offWite: "#FFFFFF",
				slightGray: "#F8F8F8",
				primaryDark: "#333333",
			},
			screens: {
				sm: "480px",
				md: "760px",
				lg: "1080px",
				xl: "1280px",
			},
			keyframes: {
				scroll: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
			animation: {
				scroll: "scroll 20s linear infinite",
			},
		},
	},
	plugins: [],
};
