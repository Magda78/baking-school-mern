import React, { useEffect } from 'react';
import Hero from '../components/hero';
import Booking from '../components/booking';
import Programs from '../components/programs';
import About from '../components/about';
import Galery from '../components/galery';
import Testimonials from '../components/testimonials';
import Contact from '../components/contact';
import AOS from 'aos';

function Home({ screenSize, setOverlay, setDetails, setProgramName }) {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className='w-full'>
			<Hero screenSize={screenSize} />
			<Booking />
			<Programs screenSize={screenSize} setDetails={setDetails} setOverlay={setOverlay} setProgramName={setProgramName} />
			<About screenSize={screenSize} />
			<Galery />
			<Testimonials screenSize={screenSize} />
			<Contact />
			{console.log(typeof setOverlay, typeof setProgramName)}
		</div>
	);
}

export default Home;
