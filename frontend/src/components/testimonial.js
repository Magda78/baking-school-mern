import { Icon } from '@iconify/react';

function Testimonial({ name, description }) {
	return (
		<section
			data-aos="flip-left"
			data-aos-offset="350"
			data-delay="200"
			className="pb-[47px] px-[41px] pt-16 bg-white flex flex-col items-center justify-center rounded-[10px] xl:w-[100%]"
		>
			<h2 className="text-base  text-[#929292]  font-Nunito font-normal mb-8 text-center">
				<Icon icon="ri:double-quotes-l" className="inline-block mr-2 text-[#798DD8]" />
				<span className='text-[#313957]'>{description}</span>
				<Icon icon="ri:double-quotes-r" className="inline-block ml-2 text-[#798DD8]" />
			</h2>
			<div className="flex flex-row items-center justify-center mb-8">
				<img src="/img/testimonials/testimonial1.png" alt="testimonial" />
				<p className="text-base text-[#798DD8] text-opacity-50 font-Nunito font-normal ml-4 text-center">-{name}</p>
			</div>
		</section>
	);
}

export default Testimonial;
