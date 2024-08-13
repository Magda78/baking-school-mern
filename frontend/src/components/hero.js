import React from 'react';

function Hero() {
	return (
		<section id="hero" className="flex flex-col xl:flex-row xl:justify-center xl:items-center justify-center items-center mt-4 xl:flex-1">
			<div className="flex flex-col items-center justify-center px-8 md:px-16 xl:w-[60%]">
				<h1 className="font-bold text-6xl xl:text-9xl  uppercase text-[#313957] leading-[70px] text-center font-Nunito xl:text-left">
					Bake with us!
				</h1>
				<p className="mt-8 mb-14 text-xl text-[#798DD8] text-opacity-50 leading-relaxed text-center font-Nunito xl:text-left">
					Embark on a delectable journey of culinary mastery as you unlock the secrets of baking and
					discover the artistry that lies within each delicious creation at our renowned baking school.
				</p>
			</div>
			<img
				src="/img/turn-bg.png"
				alt="Background of a baking scene"
				className="rotate-[-55deg] xl:rotate-[45deg] xl:w-[40%] xl:mt-[-130px] mt-[-230px] md:mt-[-270px] lg:mt-[-330px] right-[50px] object-cover filter opacity-80 z-10"
			/>
		</section>
	);
}

export default Hero;
