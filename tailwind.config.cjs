/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'corp-blue': '#4a90e2',
				'corp-blue-dark': '#357abd',
				'corp-green': '#5cb85c',
				'corp-green-dark': '#449d44',
				'corp-gray': '#e0e0e0',
				'corp-gray-light': '#f5f5f5',
				'corp-text': '#000000',
				'corp-text-light': '#333333',
			},
			boxShadow: {
				'corp': '0 2px 4px rgba(0,0,0,0.1)',
				'corp-lg': '0 4px 6px rgba(0,0,0,0.1)',
			},
		},
	},
	plugins: [],
};
