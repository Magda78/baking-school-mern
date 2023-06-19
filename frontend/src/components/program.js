import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Program({ name, description, price }) {
	return (
		<section className="pb-[47px] px-[41px] pt-16 bg-white flex flex-col items-center">
			<h2 className="text-xl uppercase text-dark-blue font-Nunito font-bold mb-8">{name}</h2>
			<p className="text-base text-very-dark-blue font-Nunito font-normal mb-8 text-center">{description}</p>
			<p className="text-4xl text-dark-blue font-Nunito font-bold mb-8">
				${price} <span className="text-base text-dark-blue font-Nunito font-normal">per hour</span>
			</p>
			<button
				type="button"
				className="flex items-center justify-center text-pink uppercase text-bold text-base border border-pink rounded-[10px] py-4  w-[270px]"
			>
				Learn more<span className="ml-4">
					<ArrowForwardIcon />
				</span>
			</button>
		</section>
	);
}

export default Program;
