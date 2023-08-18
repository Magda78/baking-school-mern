import backgroundImage from '../img/hero-bg.png';

function Hero() {
	const containerStyle = {
		backgroundImage: `url(${backgroundImage})`
	};
	return (
		<section className="flex flex-row" style={{ ...containerStyle, height: '100%' }}>
			<div className="w-full h-full object-cover sm:hidden md:hidden lg:hidden">
				<img src="/img/cake.png" alt="cake" />
			</div>
			<div className="pl-[72px] pr-[127px] flex flex-col items-center justify-center">
				<h1 className="font-bold text-7xl font-Nunito uppercase text-dark-blue leading-[90px]">
					B<span className="text-pink">a</span>k<span className="text-pink">e</span> with us
				</h1>
				<p className="mt-[30px] mb-[56px] font-normal text-xl font-Nunito text-very-dark-blue leading-relaxed  text-center">
					Embark on a delectable journey of culinary mastery as you unlock the secrets of baking and discover
					the artistry that lies within each delicious creation at our renowned baking school.
				</p>
				<button
					type="submit"
					className="font-bold text-base font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
				>
					Schedule Class
				</button>
			</div>
		</section>
	);
}

export default Hero;
