/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		screens: {
			'3xl': { min: '1440px' },
			'2xl': { max: '1440px' },
			// => @media (max-width: 1535px) { ... }

			xl: { max: '1280px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1024px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '768px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '639px' }
			// => @media (max-width: 639px) { ... }
		},
		colors: {
			pink: '#F46B94',
			white: '#FFFFFF',
			black: '#000000',
			'dark-blue': '#2A4AC8',
			'very-dark-blue': '#3C4C8D',
			'light-blue': '#8AA2FF',
			'midium-blue': '#E8EBF6',
			'lighter-blue': '#C7D2FC',
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
