//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../store/cartSllice';
import { format } from 'date-fns';

function Booking() {
	const [ selectedDate, setSelectedDate ] = useState(null);
	const [ program, setProgram ] = useState('');
	const [ students, setStudents ] = useState('');
	const dispatch = useDispatch();
	const formatedStartDate = format(new Date(selectedDate), 'dd MMMM yy');

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

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

	const isWeekendOrWednesdayOrPast = (date) => {
		// Disable Saturdays (6), Sundays (0), Wednesdays (3), and dates before today
		return (
		  date.getDay() === 0 ||
		  date.getDay() === 6 ||
		  date.getDay() === 3 ||
		  date < new Date()
		);
	  };
	  
	return (
		<section className="px-[47px] py-[48px]">
			<form className="flex flex-col justify-between" onSubmit={addToCartHandler}>
				<div className="flex flex-row justify-between mb-[50px] sm:flex-col md:flex-col">
					<div className="flex flex-col w-96 sm:w-full md:w-full">
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Select program...</InputLabel>
								<Select
									labelId="program"
									id="program"
									value={program}
									onChange={(e) => setProgram(e.target.value)}
									label="Choose a Program..."
								>
									<MenuItem value="Kids Program">Kids Program</MenuItem>
									<MenuItem value="Teens Program">Teens Program</MenuItem>
									<MenuItem value="Adult Program">Adult Program</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>

					<div className="flex flex-col w-96 sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Qty.</InputLabel>
								<Select
									labelId="students"
									id="students"
									value={students}
									onChange={(e) => setStudents(e.target.value)}
									label="Count"
								>
									<MenuItem value="1">1</MenuItem>
									<MenuItem value="2">2</MenuItem>
									<MenuItem value="3">3</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
					<div className="sm:mt-6 md:mt-6 sm:w-full md:w-full">
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Select Date"
								value={selectedDate}
								onChange={handleDateChange}
								shouldDisableDate={isWeekendOrWednesdayOrPast}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
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
