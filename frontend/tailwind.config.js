/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		screens: {
			sm: '640px', // Small screens (up to 640px)
			md: '768px', // Medium screens (up to 768px)
			lg: '1024px', // Large screens (up to 1024px)
			xl: '1280px', // Extra-large screens (up to 1280px)
			'2xl': '1440px' // Custom screen size (up to 1440px)
		},
		colors: {
			pink: '#F46B94',
			white: '#FFFFFF',
			'dark-blue': '#2A4AC8',
			'very-dark-blue': '#3C4C8D',
			'light-blue': '#8AA2FF',
			'midium-blue': '#E8EBF6',
			'very-light-blue': '#F0F3FF',
			'light-pink': '#F395B1'
		},
		fontFamily: {
			Nunito: [ 'Nunito' ]
		},
		extend: {}
	},
	plugins: []
};
