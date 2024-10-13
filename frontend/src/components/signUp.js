import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addUser } from '../store/userSlice';

function SignUp({ setOverlay, setSign, sign }) {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			username: '',
			lastname: '',
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Required'),
			lastname: Yup.string().required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
		}),
		onSubmit: async (values) => {
			try {
				const response = await fetch('http://localhost:3001/users/signUp', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: values.username,
						lastName: values.lastname,
						email: values.email,
						password: values.password
					})
				});
				const responseData = await response.json();
				setOverlay(false);
				console.log(responseData);
				const user = {
					id: nanoid(),
					email: values.email
				};
				dispatch(addUser(user));
			} catch (err) {
				console.log(err);
			}
		}
	});
	return (
		<section data-aos="zoom-in" className="bg-white p-10 w-9/12 h-9/12 absolute flex justify-center items-center rounded z-40">
			<div className="flex-1 mr-10 ">
				<img src="/img/cake.png" alt="cake" className="scale-130  object-fit rounded" />
			</div>
			<div className="flex-1">
				<form onSubmit={formik.handleSubmit} className="flex flex-col w-full h-full">
					<div className="flex flex-col">
						<label htmlFor="username" className="font-bold text-base font-Nunito text-dark-blue mb-4">
							First Name:
						</label>
						<input
							type="text"
							id="username"
							name="username"
							aria-required="true"
							aria-label="username"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
							className={`${formik.errors.username
								? 'mb-2'
								: 'mb-4'} border-2 border-grayish rounded  text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue`}
						/>
						{formik.touched.username && formik.errors.username ? (
							<p className="text-xs text-red-error mb-2">{formik.errors.username}</p>
						) : null}
					</div>
					<div className="flex flex-col">
						<label htmlFor="lastname" className="font-bold text-base font-Nunito text-dark-blue mb-4">
							Last Name:
						</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							aria-required="true"
							aria-label="lastname"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.lastname}
							className={`${formik.errors.username
								? 'mb-2'
								: 'mb-4'} border-2 border-grayish rounded  text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue`}
						/>
						{formik.touched.lastname && formik.errors.lastname ? (
							<p className="text-xs text-red-error mb-2">{formik.errors.lastname}</p>
						) : null}
					</div>
					<div className="flex flex-col">
						<label htmlFor="email" className="font-bold text-base font-Nunito text-dark-blue mb-4">
							Email:
						</label>
						<input
							type="email"
							id="email"
							name="email"
							aria-required="true"
							aria-label="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className={`${formik.errors.username
								? 'mb-2'
								: 'mb-4'} border-2 border-grayish rounded  text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue`}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className="text-xs text-red-error mb-2">{formik.errors.email}</p>
						) : null}
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="font-bold text-base font-Nunito text-dark-blue mb-4">
							Password:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							aria-required="true"
							aria-label="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							className={`${formik.errors.username
								? 'mb-2'
								: 'mb-8'} border-2 border-grayish rounded  text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue`}
						/>
						{formik.touched.password && formik.errors.password ? (
							<p className="text-xs text-red-error mb-2">{formik.errors.password}</p>
						) : null}
					</div>
					<div className="flex justify-between mt-4">
						<button
							type="submit"
							className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
						>
							Sign Up
						</button>
						<button
							type="submit"
							className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
							onClick={() => {
								setSign(false);
								setOverlay(false);
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default SignUp;
