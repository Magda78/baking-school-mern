import React, { useEffect } from 'react';
import Hero from '../components/hero';
import Booking from '../components/booking';
import Programs from '../components/programs';
import About from '../components/about';
import Galery from '../components/galery';
import Testimonials from '../components/testimonials';
import Contact from '../components/contact';
import AOS from 'aos';

function Home({ setOverlay, setDetails, setProgramName }) {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className='w-full relative'>
			<Hero />
			<Booking />
			<Programs setDetails={setDetails} setOverlay={setOverlay} setProgramName={setProgramName} />
			<About />
			<Galery />
			<Testimonials />
			<Contact />
		</div>
	);
}

export default Home;
