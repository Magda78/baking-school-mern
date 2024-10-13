import React from 'react';

function Hero() {
	return (
		<section id="hero" className="flex flex-row justify-center items-center  mt-4 flex-1 w-full h-[100%]">
			<div className="flex flex-col justify-center  px-8 md:px-16 w-[60%]">
				<h1 className="font-bold text-4xl  md:text-9xl  uppercase text-[#313957]   font-Nunito">
					Bake with us!
				</h1>
				<p className="mt-8 mb-14 text-base md:text-xl text-[#929292] text-opacity-50 leading-relaxed text-left font-Nunito">
					Embark on a delectable journey of culinary mastery as you unlock the secrets of baking and
					discover the artistry that lies within each delicious creation at our renowned baking school.
				</p>
			</div>
			<div className='w-[40%] h-[100%]'>
				<img
					src="/img/header.png"
					alt="Background of a baking scene"
					className='object-fill h-[100%] w-[100%]'
				/>
			</div>

		</section>
	);
}

export default Hero;
