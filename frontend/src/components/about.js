import backgroundImage from '../img/hero-bg.png';

function About() {
	const containerStyle = {
		backgroundImage: `url(${backgroundImage})`,
		height: '100%',
		width: '100%' // Ensure the container takes full height
	};

	return (
		<section className="about px-8 md:px-16 py-10 md:py-16 mt-10 w-full md:mt-0" style={containerStyle}>
			<div className="flex flex-col  xl:flex-row items-center justify-center  xl:justify-between bg-gradient-to-r from-bg ">

				{/* Wrap content in a div to control order */}
				<div className="flex flex-col  xl:flex-row items-center justify-center  w-full">

					{/* Image */}
					<div
						data-aos="zoom-in"
						data-aos-offset="350"
						data-delay="300"
						className="flex flex-1 xl:order-1 mb-12 xl:mb-0 xl:mr-16"
					>
						<img src="/img/baker.png" alt="logo" className="rounded-[10px] " />
					</div>

					{/* Text Content */}
					<div
						data-aos="fade-right xl:fade-up-right xl:fade-down"
						data-aos-offset="350 xl:600"
						data-delay="300"
						className="flex flex-1 text-lg font-Nunito text-[#929292] font-normal leading-relaxed xl:order-2 order-1 text-center  xl:text-left"
					>
						At Brooklyn Baking School, we are passionate about sharing the art and joy of baking with baking
						enthusiasts of all levels. Our mission is to inspire and empower individuals to explore their
						creativity in the kitchen and master the art of baking. With our expert instructors, state-of-the-art
						facilities, and hands-on approach, we offer a wide range of baking classes and workshops designed to
						cater to the unique needs and interests of our students. Whether you're a beginner looking to learn
						the basics or an experienced baker aiming to refine your skills, we provide a supportive and immersive
						learning environment where you can discover new techniques, experiment with flavors, and create
						delicious masterpieces. Join us on this delectable journey and unlock your full baking potential!
					</div>

				</div>
			</div>
		</section>
	);
}

export default About;

