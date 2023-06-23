import { testimonials } from '../data/data';
import Testimonial from './testimonial';

function Testimonials({ screenSize }) {
	return (
		<section className="bg-midium-blue py-[48px] px-[154px] grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 xl:gap-y-8 xl:justify-items-center xl:gap-x-8 2xl:gap-x-8 3xl:gap-x-8 lg:gap-x-8">
			{testimonials?.map((item, index) => {
				let colSpan = 'col-span-1';

				if (screenSize === 'xl' && index === 2) {
					colSpan = 'col-span-2';
				} else if (screenSize === 'sm') {
					colSpan = 'col-span-1';
				}

				return (
					<div key={item.id} className={colSpan}>
                        {console.log('screen', screenSize)}
						<Testimonial name={item.name} description={item.description} img={item.img}/>
					</div>
				);
			})}
		</section>
	);
}

export default Testimonials;