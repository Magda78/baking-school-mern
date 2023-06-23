import backgroundImage from '../img/hero-bg.png';

function About({ screenSize }) {
	const containerStyle = {
		backgroundImage: `url(${backgroundImage})`
	};
	return (
		<section>
			{screenSize === 'sm' || screenSize === 'md' || screenSize === 'lg'? (
				<div
					className="px-[127px] py-[45px] flex flex-col justify-center items-center"
					style={{ ...containerStyle, height: '100%' }}
				>
					<div className="flex  flex-col justify-center items-center">
						<img src="/img/baker.png" alt="logo" />
						<div className="text-center mt-[45px] text-base font-Nunito text-very-dark-blue font-normal leading-8">
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
					className="pl-[127px] py-[45px] flex flex-row items-center justify-between"
					style={{ ...containerStyle, height: '100%' }}
				>
					<div className="flex flex-1 mr-10 text-base font-Nunito text-very-dark-blue font-normal leading-8">
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
					<div className="flex flex-1">
						<img src="/img/baker.png" alt="logo" />
					</div>
				</div>
			)}
		</section>
	);
}

export default About;
