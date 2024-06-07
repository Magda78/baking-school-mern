import React, { useEffect } from 'react';
import Hero from '../components/hero';
import Booking from '../components/booking';
import Programs from '../components/programs';
import About from '../components/about';
import Galery from '../components/galery';
import Testimonials from '../components/testimonials';
import Contact from '../components/contact';
import AOS from 'aos';

function Home({ screenSize }) {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div>
			<Hero screenSize={screenSize} />
			<Booking />
			<Programs screenSize={screenSize} />
			<About screenSize={screenSize} />
			<Galery />
			<Testimonials screenSize={screenSize} />
			<Contact />
		</div>
	);
}

export default Home;
