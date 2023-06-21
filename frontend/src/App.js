import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Booking from './components/booking';
import Programs from './components/programs';
import About from './components/about';

function App() {
	const [ screenSize, setScreenSize ] = useState('');
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				setScreenSize('sm');
			} else if (640 < window.innerWidth && window.innerWidth <= 768) {
				setScreenSize('md');
			} else if (768 < window.innerWidth && window.innerWidth <= 1024) {
				setScreenSize('lg');
			} else if (1024 < window.innerWidth && window.innerWidth <= 1280) {
				setScreenSize('xl');
			} else if (1280 < window.innerWidth && window.innerWidth <= 1440) {
				setScreenSize('2xl');
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div className="max-w-[1440px]">
			<Navbar />
			<Hero />
			<Booking />
			{console.log(screenSize)}
			<Programs screenSize={screenSize} />
			<About />
		</div>
	);
}

export default App;
