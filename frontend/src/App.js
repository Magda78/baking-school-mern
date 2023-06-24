import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Booking from './components/booking';
import Programs from './components/programs';
import About from './components/about';
import Galery from './components/galery';
import Testimonials from './components/testimonials';
import Contact from './components/contact';

function App() {
	const [ screenSize, setScreenSize ] = useState('');
	const [ overlay, setOverlay ] = useState(false);
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
		<div className="max-w-[1440px] relative flex flex-col justify-center">
			{console.log('overlay', overlay)}
			<Navbar screenSize={screenSize} setOverlay={setOverlay} />
			<Hero />
			<Booking />
			<Programs screenSize={screenSize} />
			<About screenSize={screenSize}/>
      <Galery />
      <Testimonials screenSize={screenSize}/>
      <Contact />
			{overlay ? (
				<div className="bg-white w-[85%] h-screen py-[45px] pr-[127px]  absolute top-[140px] right-0 flex flex-col items-end leading-6">
					<h2 className="font-bold text-base font-Nunito uppercase text-pink cursor-pointer hover:text-light-blue">
						Home
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Programs
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Galery
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Contact Us
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Log In
					</h2>
				</div>
			) : null}
		</div>
	);
}

export default App;
