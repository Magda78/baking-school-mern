import backgroundImage from '../img/hero-bg.png';

function About({ screenSize }) {
	const containerStyle = {
		backgroundImage: `url(${backgroundImage})`
	};
	return (
		<section className="about">
			{screenSize === 'sm' || screenSize === 'md' || screenSize === 'lg' ? (
				<div
					className="px-[127px] py-[48px] flex flex-col justify-center items-center sm:px-[47px] md:px-[47px]"
					style={{ ...containerStyle, height: '100%' }}
				>
					<div
						data-aos="fade-down"
						data-aos-offset="600"
						data-delay="200"
						className="flex  flex-col justify-center items-center "
					>
						<img src="/img/baker.png" alt="logo" />
						<div
							data-aos="fade-up-right"
							data-aos-offset="600"
							data-delay="200"
							className="text-center mt-[45px] text-lg font-Nunito text-very-dark-blue font-normal"
						>
							At Brooklyn Baking School, we are passionate about sharing the art and joy of baking with
							baking enthusiasts of all levels. Our mission is to inspire and empower individuals to
							explore their creativity in the kitchen and master the art of baking. With our expert
							instructors, state-of-the-art facilities, and hands-on approach, we offer a wide range of
							baking classes and workshops designed to cater to the unique needs and interests of our
							students. Whether you're a beginner looking to learn the basics or an experienced baker
							aiming to refine your skills, we provide a supportive and immersive learning environment
							where you can discover new techniques, experiment with flavors, and create delicious
							masterpieces. Join us on this delectable journey and unlock your full baking potential!
						</div>
					</div>
				</div>
			) : (
				<div
					className="pl-[127px] py-[48px] flex flex-row items-center justify-between"
					style={{ ...containerStyle, height: '100%' }}
				>
					<div
						data-aos="fade-right"
						data-aos-offset="350"
						data-delay="300"
						className="flex flex-1 mr-10 text-lg font-Nunito text-very-dark-blue font-normal leading-relaxed "
					>
						At Brooklyn Baking School, we are passionate about sharing the art and joy of baking with baking
						enthusiasts of all levels. Our mission is to inspire and empower individuals to explore their
						creativity in the kitchen and master the art of baking. With our expert instructors,
						state-of-the-art facilities, and hands-on approach, we offer a wide range of baking classes and
						workshops designed to cater to the unique needs and interests of our students. Whether you're a
						beginner looking to learn the basics or an experienced baker aiming to refine your skills, we
						provide a supportive and immersive learning environment where you can discover new techniques,
						experiment with flavors, and create delicious masterpieces. Join us on this delectable journey
						and unlock your full baking potential!
					</div>
					<div className="flex flex-1" data-aos="zoom-in" data-aos-offset="350" data-delay="300">
						<img src="/img/baker.png" alt="logo" />
					</div>
				</div>
			)}
		</section>
	);
}

export default About;
