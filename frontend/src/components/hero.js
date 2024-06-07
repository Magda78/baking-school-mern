import backgroundImage from '../img/hero-bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Hero() {
	const containerStyle = {
		backgroundImage: `url(${backgroundImage})`
	};

	return (
		<div data-aos="zoom-in">
			<section id="hero" className="flex flex-row " style={{ ...containerStyle, height: '100%' }}>
				<div className="w-full h-full  sm:hidden md:hidden lg:hidden">
					<img src="/img/cake.png" alt="cake" className="scale-130 w-full h-full object-cover" />
				</div>
				<div className="pl-[72px] pr-[127px] flex flex-col items-center justify-center ">
					<h1
						data-aos="fade-down"
						data-aos-delay="900"
						className="font-bold text-7xl font-Nunito uppercase text-dark-blue leading-[90px]"
					>
						B<span className="text-pink">a</span>k<span className="text-pink">e</span> with us !
					</h1>
					<p
						data-aos="fade-down"
						data-aos-delay="1100"
						className="mt-[30px] mb-[56px] font-normal text-xl font-Nunito text-very-dark-blue leading-relaxed  text-center"
					>
						Embark on a delectable journey of culinary mastery as you unlock the secrets of baking and
						discover the artistry that lies within each delicious creation at our renowned baking school.
					</p>
					<div />
				</div>
			</section>
		</div>
	);
}

export default Hero;
