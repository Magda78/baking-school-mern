function SignUp({ setOverlay }) {
	const closeOverlayHandler = () => {
		setOverlay(false);
	};
	return (
		<section className="bg-white p-10 flex w-[50%] justify-center items-center">
			<form className="flex flex-col w-full h-full">
				<div className="flex flex-col">
					<label for="username" className="font-bold text-base font-Nunito text-dark-blue mb-4">
						First Name:
					</label>
					<input
						type="text"
						id="username"
						name="username"
						aria-required="true"
						aria-label="username"
						className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="flex flex-col">
					<label for="lastname" className="font-bold text-base font-Nunito text-dark-blue mb-4">
						Last Name:
					</label>
					<input
						type="text"
						id="lastname"
						name="lastname"
						aria-required="true"
						aria-label="lastname"
						className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="flex flex-col">
					<label for="email" className="font-bold text-base font-Nunito text-dark-blue mb-4">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						aria-required="true"
						aria-label="email"
						className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="flex flex-col">
					<label for="password" className="font-bold text-base font-Nunito text-dark-blue mb-4">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						aria-required="true"
						aria-label="password"
						className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="flex justify-between">
					<button className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink">
						Sign Up
					</button>
					<button
						className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
						onClick={closeOverlayHandler}
					>
						Cancel
					</button>
				</div>
			</form>
		</section>
	);
}

export default SignUp;
