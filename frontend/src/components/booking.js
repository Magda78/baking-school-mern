import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

function Booking() {
	const [ startDate, setStartDate ] = useState(new Date());
	return (
		<section className="px-[47px] py-[48px]">
			<form className="flex flex-col justify-between">
				<div className="flex flex-row justify-between mb-[50px] sm:flex-col md:flex-col">
					<div className="flex flex-col w-96 sm:w-full md:w-full">
						<label
							htmlFor="program"
							id="program"
							className="font-semibold text-lg font-Nunito text-dark-blue mb-[27px]"
						>
							Choose a Program:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6">
							<select
								id="program"
								name="program"
								aria-labelledby="program"
								className="bg-very-light-blue text-dark-blue w-full cursor-pointer outline-none"
							>
								<option value="option1" className="font-normal text-base font-Nunito text-dark-blue">
									Kids Program
								</option>
								<option value="option2" className="font-normal text-base font-Nunito text-dark-blue">
									Teens Program
								</option>
								<option value="option3" className="font-normal text-base font-Nunito text-dark-blue">
									Adult Program
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col w-52 sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<label
							htmlFor="program"
							id="program"
							className="font-semibold text-lg font-Nunito text-dark-blue mb-[27px]"
						>
							Number of Students:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6">
							<select
								id="program"
								name="program"
								aria-labelledby="program"
								className="bg-very-light-blue text-dark-blue w-full cursor-pointer outline-none"
							>
								<option value="option1" className="font-normal text-base font-Nunito text-dark-blue">
									1
								</option>
								<option value="option2" className="font-normal text-base font-Nunito text-dark-blue">
									2
								</option>
								<option value="option3" className="font-normal text-base font-Nunito text-dark-blue">
									3
								</option>
							</select>
						</div>
					</div>
					<div className="sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<label htmlFor="date" className="font-semibold text-lg font-Nunito text-dark-blue ">
							Choose a Date:
						</label>
						<div className="py-3 px-6 bg-very-light-blue pr-6 mt-[27px]">
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
