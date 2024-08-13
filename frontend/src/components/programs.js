import { data } from '../data/data';
import Program from './program';

function Programs({ setOverlay, setDetails, setProgramName }) {
	return (
		<section
			id="programs"
			className="lg:py-12 md:px-16  mt-16 px-8 mb-10 xl:mb-8 grid grid-cols-1 gap-y-8 gap-x-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 2xl:gap-x-8 3xl:gap-x-8 z-20"
		>
			{data?.map((item, index) => (
				<div
					key={item.id}
					className={`flex flex-col ${index === 2 ? 'lg:col-span-2  xl:col-span-1 ' : ''
						}`}
				>
					<Program
						name={item.name}
						description={item.description}
						price={item.price}
						setOverlay={setOverlay}
						setDetails={setDetails}
						setProgramName={setProgramName}
					/>
				</div>
			))}
		</section>
	);
}

export default Programs;

