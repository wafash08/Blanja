/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				metropolis: ['Metropolis'],
			},
			transitionProperty: {
				'slide-in': 'visibility, transform, opacity',
			},
		},
	},
	plugins: [],
};
