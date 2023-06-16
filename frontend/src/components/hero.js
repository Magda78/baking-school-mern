function Hero() {
	return (
		<section className="flex flex-row items-center">
			<div>
            <img src="/img/cake.png" alt="cake" />
            </div>
            <div className="ml-[72px] w-[493px]">
                <h1 className="font-bold text-8xl font-Nunito uppercase text-dark-blue leading-[90px]">B<span className="text-pink">a</span>k<span className="text-pink">e</span> with us</h1>
                <p className="mt-[30px] mb-[56px] font-normal text-2xl font-Nunito text-very-dark-blue">Join Our Community of Baking Enthusiasts and Learn to Create Delicious Masterpieces</p>
                <button className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink">
					Schedule Class
				</button>
            </div>
		</section>
	);
}

export default Hero;