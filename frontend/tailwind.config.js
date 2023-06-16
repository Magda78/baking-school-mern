/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		colors: {
			pink: '#F46B94',
			white: '#FFFFFF',
			'dark-blue': '#2A4AC8',
			'very-dark-blue': '#3C4C8D',
			'light-blue': '#8AA2FF',
			'light-pink': '#F395B1'
		},
		fontFamily: {
			Nunito: [ 'Nunito' ]
		},
		extend: {}
	},
	plugins: []
};
