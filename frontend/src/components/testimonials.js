import React from 'react';
import { testimonials } from '../data/data';
import Testimonial from './testimonial';

function Testimonials({ screenSize }) {
	return (
		<section className="bg-midium-blue px-8 py-10 lg:p-16 grid grid-cols-1 gap-y-8 xl:grid-cols-3 xl:gap-y-8 xl:gap-x-8 2xl:gap-x-8 3xl:gap-x-8 lg:gap-x-8">
			{testimonials?.map((item, index) => (
				<div
					key={item.id}
					className={`flex flex-col ${index === 2 ? 'lg:col-span-2 lg:justify-self-stretch xl:col-span-1' : 'lg:justify-self-center'
						}`}
				>
					<Testimonial name={item.name} description={item.description} img={item.img} />
				</div>
			))}
		</section>
	);
}

export default Testimonials;
