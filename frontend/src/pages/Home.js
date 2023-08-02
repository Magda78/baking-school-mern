import Hero from '../components/hero';
import Booking from '../components/booking';
import Programs from '../components/programs';
import About from '../components/about';
import Galery from '../components/galery';
import Testimonials from '../components/testimonials';
import Contact from '../components/contact';

function Home({screenSize}) {
    
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
