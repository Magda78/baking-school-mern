import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Program({ name, description, price, setDetails, setOverlay, setProgramName }) {

	const clickHandler = () => {
		setDetails(true);
		setOverlay(true);
		setProgramName(name)
	}
	return (
		<section
			data-aos="flip-left"
			data-aos-offset="350"
			data-delay="200"
			className="relative z-20 pb-[47px] px-[41px] pt-16 flex flex-col items-center rounded-[10px] bg-white border border-medium-blue flex-1 "
		>
			<h2 className="text-xl uppercase text-[##313957] font-Nunito font-bold mb-8">{name}</h2>
			<p className="text-base text-[#798DD8] text-opacity-50 font-Nunito font-normal mb-8 text-center">{description}</p>
			<p className=" text-4xl text-[#313957] font-Nunito font-bold mb-8">
				${price} <span className="text-base  font-Nunito font-normal">per hour</span>
			</p>
			<button
				onClick={clickHandler}
				aria-label={`Learn more about ${name}`}
				type="button"
				className="  flex items-center justify-center text-pink uppercase text-bold text-sm border border-pink rounded-[10px] py-4 w-[270px] transition-transform transform duration-300 cursor-pointer hover:scale-110"
			>
				Learn more<span className="ml-4">
					<ArrowForwardIcon />
				</span>
			</button>
		</section>
	);
}

export default Program;
