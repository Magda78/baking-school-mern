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
import { addToBasket, clearCart } from '../store/cartSllice';
import { addToDate, updateAvailability } from '../store/availabilitiesSlice';
import { selectItems, selectIsFetched } from '../store/availabilitiesSlice';
import { selectUser } from "../store/userSlice";
//import { format } from 'date-fns';
import { format, isBefore, startOfDay, parseISO } from 'date-fns'; // <-- Added import for `isBefore`


function Booking() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [notAvailability, setNotAvailability] = useState([]);
	const [program, setProgram] = useState('Kids Program');
	const [students, setStudents] = useState(0);
	const [alert, setAlert] = useState(false)
	const [fadeOut, setFadeOut] = useState(false);
	const dispatch = useDispatch();
	const availabilitiesData = useSelector(selectItems);
	const isFetched = useSelector(selectIsFetched);
	const user = useSelector(selectUser)

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

	useEffect(() => {
		if (alert) {
			const timer = setTimeout(() => {
				setTimeout(() => setAlert(false));
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [alert])

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('20 seconds passed');
			console.log('available', availabilitiesData)
			dispatch(clearCart());

		}, 60 * 1000);

		return () => clearTimeout(timer); // Cleanup on unmount
	}, [dispatch]);

	const handleDateChange = (date) => {
		console.log('selected date=========', date)
		setSelectedDate(date);
	};

	const addToCartHandler = (e) => {
		console.log('notAvai------------------', notAvailability);
		e.preventDefault();
		setAlert(true);

		if (user.length > 0) {
			console.log('user============>>>>>>>>>', user)
			const formatDateInUTC = (date) => {
				const utcDate = startOfDay(date);
				return format(utcDate, 'yyyy-MM-dd');
			};

			// Convert local date to UTC correctly
			const convertToUTC = (date) => {
				// Adjusting date to UTC manually
				const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
				return new Date(date.getTime() + offset);
			};

			// Format the selected date in UTC
			const selectedDateUTC = selectedDate
				? convertToUTC(selectedDate)
				: null;
			const formattedStartDate = selectedDateUTC
				? formatDateInUTC(selectedDateUTC)
				: null;

			console.log('Selected Date:', selectedDate);
			console.log('selectedDateUTC:', selectedDateUTC);
			console.log('Formatted Start Date:', formattedStartDate);

			// Ensure item.date is handled consistently in UTC
			const classIsThere = notAvailability.find((item) => {
				const itemDate = parseISO(item.date); // Parse the ISO date string
				const itemDateUTC = convertToUTC(itemDate);
				const itemDateFormatted = formatDateInUTC(itemDateUTC);

				console.log('Raw Item Date:', item.date);
				console.log('Parsed Date:', itemDate);
				console.log('Item Date UTC:', itemDateUTC);
				console.log('Formatted Item Date:', itemDateFormatted);
				console.log('Program to Match:', program);
				console.log('Formatted Start Date:', formattedStartDate);

				return item.program === program && itemDateFormatted === formattedStartDate;
			});

			console.log('class is there', classIsThere)
			const newAvailableClassCount = classIsThere
				? classIsThere.availableClassCount - students
				: (1 - students);

			const isClassNotAvailable = newAvailableClassCount <= 0;

			const item = {
				id: nanoid(),
				program,
				students: 1,
				date: formattedStartDate,
				price: 15
			};

			if (classIsThere) {
				if (!classIsThere.isNotAvailable) {
					// Class is available; proceed with adding to basket
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
					// Class is not available; do not add to basket
					setAlert(false);
					console.error('Class is not available.');
				}
			} else {
				// Class does not exist in `notAvailability`; add it as a new entry
				dispatch(addToBasket(item));
				setNotAvailability((prev) => [...prev, {
					...item,
					availableClassCount: item.students - 1,
					isNotAvailable: true
				}]);
				dispatch(
					addToDate({
						...item,
						availableClassCount: item.students - 1,
						isNotAvailable: true
					})
				);
			}
		}
	};
	const isWeekendOrWednesdayOrPast = (date) => {
		console.log('not avalibity from cal', notAvailability)
		if (!date || isNaN(date.getTime())) return true; // Treat invalid dates as unavailable

		console.log('Checking date:', format(date, 'yyyy-MM-dd'));

		const currentDate = new Date();
		const dayOfWeek = date.getDay();

		const isPastDate = isBefore(date, currentDate);
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
		const isWednesday = dayOfWeek === 3; // Wednesday

		console.log('isPastDate:', isPastDate);
		console.log('isWeekend:', isWeekend);
		console.log('isWednesday:', isWednesday);
		const formatDateInUTC = (date) => {
			const utcDate = startOfDay(date);
			return format(utcDate, 'yyyy-MM-dd');
		};

		// Convert local date to UTC correctly
		const convertToUTC = (date) => {
			// Adjusting date to UTC manually
			const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
			return new Date(date.getTime() + offset);
		};

		// Format the selected date in UTC
		const selectedDateUTC = selectedDate
			? convertToUTC(selectedDate)
			: null;
		const formattedStartDate = selectedDateUTC
			? formatDateInUTC(selectedDateUTC)
			: null;

		// Format the checked date to UTC
		const checkedDateUTC = convertToUTC(date);
		const formattedCheckedDate = formatDateInUTC(checkedDateUTC);

		// Check for unavailability
		const isUnavailable = notAvailability.some((item) => {
			const itemDateFormatted = formatDateInUTC(convertToUTC(new Date(item.date))); // Format item date to UTC
			console.log(`Comparing ${itemDateFormatted} to ${formattedCheckedDate}`);
			return item.program === program && itemDateFormatted === formattedCheckedDate && item.isNotAvailable === true;
		});

		console.log('isUnavailable:', isUnavailable);

		return isPastDate || isWeekend || isWednesday || isUnavailable;
	};

	return (
		<section className="lg:px-16 px-8 w-full mt-10  md:mt-64 lg:mt-16 md:px-16 xl:mt-10">

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
						disabled={!selectedDate}
						className="font-bold outline-none text-sm font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink transition-transform transform duration-300  hover:scale-110"
					>
						Schedule Class
					</button>
				</div>
			</form>
			<div className='absolute top-0 right-0  w-full h-[100%] '>

			</div>
			{alert && user.length > 0 && (
				<div role="alert" className={`alert fixed right-0 bottom-5 z-50 transition-transform duration-200 w-[25%] ${alert ? 'animate-slideInFromRight' : 'animate-slideInToRight'}`}>
					<span >The class was added to the cart.</span>
				</div>
			)}
			{alert && user.length == 0 && (
				<div role="alert" className={`alert fixed right-0 bottom-5 z-50 transition-transform duration-200 w-[25%] ${alert ? 'animate-slideInFromRight' : 'animate-slideInToRight'}`}>
					<span >Please LogIn or SignUp</span>
				</div>
			)}
		</section>
	);
}

export default Booking;