import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../store/cartSllice';
import { addToDate, updateAvailability } from '../store/availabilitiesSlice';
import { selectItems, selectIsFetched } from '../store/availabilitiesSlice';
import { format } from 'date-fns';

function Booking() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [notAvailability, setNotAvailability] = useState([]);
	const [program, setProgram] = useState('Kids Program');
	const [students, setStudents] = useState(0);
	const dispatch = useDispatch();
	const availabilitiesData = useSelector(selectItems);
	const isFetched = useSelector(selectIsFetched);

	useEffect(
		() => {
			if (!isFetched) {
				console.log('Fetching availability data');
				const abortController = new AbortController();

				const fetchData = async () => {
					try {
						const response = await fetch('http://localhost:3001/availability', {
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
							signal: abortController.signal
						});

						if (!response.ok) {
							throw new Error('Network response was not ok');
						}

						const data = await response.json();
						console.log('Fetched data:', data.availabilities);

						if (Array.isArray(data.availabilities)) {
							setNotAvailability(data.availabilities);
							data.availabilities.forEach((item) => {
								dispatch(
									addToDate({
										id: nanoid(),
										date: format(new Date(item.date), 'yyyy-MM-dd'),
										program: item.program,
										availableClassCount: item.availableClassCount,
										isNotAvailable: item.isNotAvailable
									})
								);
							});
						} else {
							console.log('Error:', data);
						}
					} catch (error) {
						console.error('Fetch error:', error);
					}
				};

				fetchData();

				return () => {
					abortController.abort();
				};
			}
		},
		[dispatch, isFetched]
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const addToCartHandler = (e) => {
		e.preventDefault();

		const formattedStartDate = selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : null;

		const classIsThere = notAvailability.find((item) => {
			const itemDateFormatted = format(new Date(item.date), 'yyyy-MM-dd');
			return item.program === program && itemDateFormatted === formattedStartDate;
		});

		const newAvailableClassCount = classIsThere ? classIsThere.availableClassCount - students : 1 - students;
		const isClassNotAvailable = newAvailableClassCount <= 0;

		const item = {
			id: nanoid(),
			program,
			students: 1,
			date: formattedStartDate,
			price: 15
		};

		if (classIsThere && !classIsThere.isNotAvailable) {
			dispatch(addToBasket(item));
			const updateClass = {
				...classIsThere,
				isNotAvailable: isClassNotAvailable,
				availableClassCount: newAvailableClassCount
			};
			dispatch(updateAvailability(updateClass));
			setNotAvailability((prev) =>
				prev.map((availItem) => (availItem.id === updateClass.id ? updateClass : availItem))
			);
		} else {
			dispatch(addToBasket(item));
			setNotAvailability((prev) => [...prev, item]);
			dispatch(
				addToDate({
					id: nanoid(),
					date: formattedStartDate,
					program,
					availableClassCount: newAvailableClassCount,
					isNotAvailable: isClassNotAvailable
				})
			);
		}
	};

	const isWeekendOrWednesdayOrPast = (date) => {
		const currentDate = new Date();
		const dayOfWeek = date.getDay();
		return (
			date < currentDate ||
			(dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 3) ||
			notAvailability.some(
				(item) =>
					item.program === program &&
					format(new Date(item.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
					item.isNotAvailable
			)
		);
	};

	return (
		<section className="lg:px-16 px-8 w-full -mt-40  md:-mt-64 lg:mt-16 xl:px-8 xl:mt-2">

			<form className="flex flex-col xl:flex-row justify-between z-30 relative" onSubmit={addToCartHandler}>
				<div className="flex  justify-between mb-[50px] flex-col xl:flex-row xl:items-center xl:mb-[0] xl:w-[80%]">
					<div className="flex flex-col xl:w-[40%]">
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id="program-label">Select program...</InputLabel>
								<Select
									className="text-[#929292]"
									labelId="program-label"
									id="program"
									value={program}
									onChange={(e) => setProgram(e.target.value)}
									label="Choose a Program..."
								>
									<MenuItem value="Kids Program" className="text-[#929292]">Kids Program</MenuItem>
									<MenuItem value="Teens Program" className="text-[#929292]">Teens Program</MenuItem>
									<MenuItem value="Adult Program" className="text-[#929292]">Adult Program</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>



					<div className="mt-6 xl:mt-[0] xl:w-[40%]">
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

				<div className="flex justify-start">
					<button
						type="submit"
						className="font-bold text-sm font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink transition-transform transform duration-300  hover:scale-110"
					>
						Schedule Class
					</button>
				</div>
			</form>
			<div className='absolute top-0 right-0  w-full h-[100%] z-20'>

			</div>
		</section>
	);
}

export default Booking;
