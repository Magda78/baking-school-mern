import { Icon } from '@iconify/react';

function Testimonial({ name, description }) {
	return (
		<section className="pb-[47px] px-[41px] pt-16 bg-white flex flex-col items-center justify-center">
			<h2 className="text-base  text-dark-blue font-Nunito font-normal mb-8 text-center">
				<Icon icon="ri:double-quotes-l" className="inline-block mr-2 text-lighter-blue" />
				<span>{description}</span>
				<Icon icon="ri:double-quotes-r" className="inline-block ml-2 text-lighter-blue" />
			</h2>
			<div className="flex flex-row items-center justify-center mb-8">
				<img src="/img/testimonials/testimonial1.png" alt="testimonial" />
				<p className="text-base text-very-dark-blue font-Nunito font-normal ml-4 text-center">-{name}</p>
			</div>
		</section>
	);
}

export default Testimonial;
