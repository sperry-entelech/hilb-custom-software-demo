/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'hilb-navy': '#1e3a8a',
				'hilb-navy-light': '#3b82f6',
				'hilb-navy-dark': '#1e293b',
				'hilb-lime': '#84cc16',
				'hilb-lime-dark': '#65a30d',
			},
		},
	},
	plugins: [],
};
