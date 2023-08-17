import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../store/cartSllice';
import { format } from 'date-fns';

function Booking() {
	const [ startDate, setStartDate ] = useState(new Date());
	const [ program, setProgram ] = useState();
	const [ students, setStudents ] = useState();
	const dispatch = useDispatch();
	const formatedStartDate = format(new Date(startDate), 'dd MMMM yy');

	const addToCartHandler = (e) => {
		const item = {
			id: nanoid(),
			program,
			students,
			date: formatedStartDate,
			price: 15
		};
		dispatch(addToBasket(item));
		e.preventDefault();
		console.log('data', item);
	};
	return (
		<section className="px-[47px] py-[48px]">
			<form className="flex flex-col justify-between" onSubmit={addToCartHandler}>
				<div className="flex flex-row justify-between mb-[50px] sm:flex-col md:flex-col">
					<div className="flex flex-col w-96 sm:w-full md:w-full">
						<label htmlFor="program" id="program" className="hidden">
							Choose a Program:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6">
							<select
								id="program"
								name="program"
								aria-labelledby="program"
								onChange={(e) => {
									e.preventDefault();
									if (e.target.value) {
										setProgram(e.target.value);
									}
								}}
								className="bg-very-light-blue text-dark-blue w-full cursor-pointer outline-none"
							>
								<option value="" className="font-normal text-base font-Nunito text-dark-blue">
									Choose a Program...
								</option>
								<option
									value="Kids Program"
									className="font-normal text-base font-Nunito text-dark-blue"
								>
									Kids Program
								</option>
								<option
									value="Teens Program"
									className="font-normal text-base font-Nunito text-dark-blue"
								>
									Teens Program
								</option>
								<option
									value="Adult Program"
									className="font-normal text-base font-Nunito text-dark-blue"
								>
									Adult Program
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col w-52 sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<label htmlFor="students" id="students" className="hidden">
							Number of Students:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6">
							<select
								id="students"
								name="students"
								onChange={(e) => {
									e.preventDefault();
									if (e.target.value) {
										setStudents(e.target.value);
									}
								}}
								aria-labelledby="students"
								className="bg-very-light-blue text-dark-blue w-full cursor-pointer outline-none"
							>
								<option value="" className="font-normal text-base font-Nunito text-dark-blue">
									Count
								</option>
								<option value="1" className="font-normal text-base font-Nunito text-dark-blue">
									1
								</option>
								<option value="2" className="font-normal text-base font-Nunito text-dark-blue">
									2
								</option>
								<option value="3" className="font-normal text-base font-Nunito text-dark-blue">
									3
								</option>
							</select>
						</div>
					</div>
					<div className="sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<label htmlFor="date" className="hidden">
							Choose a Date:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6">
							<DatePicker
								selected={startDate}
								className="bg-very-light-blue text-dark-blue cursor-pointer outline-none"
								onChange={(date) => setStartDate(date)}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="font-bold text-base font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
					>
						Schedule Class
					</button>
				</div>
			</form>
		</section>
	);
}

export default Booking;
