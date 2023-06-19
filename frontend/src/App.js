import Navbar from './components/navbar';
import Hero from './components/hero';
import Booking from './components/booking';
import Programs from './components/programs';

function App() {
	return (
		<div className="max-w-[1440px]">
			<Navbar />
			<Hero />
			<Booking />
      <Programs />
		</div>
	);
}

export default App;
