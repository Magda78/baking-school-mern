/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {

		colors: {
			pink: '#F46B94',
			white: '#FFFFFF',
			black: '#000000',
			'dark-blue': '#2A4AC8',
			'very-dark-blue': '#3C4C8D',
			'light-blue': '#8AA2FF',
			'medium-blue': '#E8EBF6',
			'lighter-blue': '#C7D2FC',
			'very-light-blue': '#F0F3FF',
			'light-pink': '#F395B1',
			grayish: '#A4ABC4',
			'red-error': '#FF9494',
			'bg': '#F0F3FF'
		},
		fontFamily: {
			Nunito: ['Nunito']
		},
		extend: {
			keyframes: {
				slideInFromRight: {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideInToRight: {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' },
				},
			},
			animation: {
				slideInFromRight: 'slideInFromRight 0.5s ease-out',
				slideInToRight: 'slideInToRight 1s ease-out',
			},
		}
	},
	plugins: [
		require('daisyui'),
		require('tailwindcss-animated')

	]
};
