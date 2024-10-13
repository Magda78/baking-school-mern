function Contact() {
	return (
		<section data-aos="zoom-in" data-aos-offset="350" data-delay="300" id="contactUs" className="relative flex flex-col justify-center z-50 px-8 py-10  lg:p-16 2xl:w-full">
			<form className="flex flex-col justify-between items-center sm:items-start">
				<div className="flex flex-col justify-between items-center  w-full">
					<div className="flex flex-col w-full xl:flex-row ">
						<div className="flex flex-col xl:mr-24 flex-1 m-0 ">
							<label htmlFor="userName" className="font-bold text-base font-Nunito text-[#313957] mb-4">
								First Name:
							</label>
							<input
								type="text"
								id="userName"
								name="userName"
								required
								aria-label="userName"
								className="border-2 border-[#929292] border-opacity-50 rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>

						<div className="flex flex-col flex-1 w-full">
							<label htmlFor="lastName" className="font-bold text-base font-Nunito text-[#313957] mb-4">
								Last Name:
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								required
								aria-label="lastName"
								className="border-2 border-[#929292] border-opacity-50 rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>
					</div>
					<div className="flex flex-col w-full xl:flex-row xl:space-x-4">
						<div className="flex flex-col xl:mr-24 m-0 flex-1 ">
							<label htmlFor="Email" className="font-bold text-base font-Nunito text-[#313957] mb-4">
								Email:
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								aria-label="email"
								className="border-2 border-[#929292] border-opacity-50 rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>

						<div className="flex flex-col w-full flex-1">
							<label htmlFor="phone" className="font-bold text-base font-Nunito text-[#313957] mb-4">
								Phone number:
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								placeholder="XXX-XXX-XXXX"
								required
								className="border-2 border-[#929292] border-opacity-50 rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col  justify-center w-full">
					<label htmlFor="msg" className="font-bold text-base font-Nunito text-[#313957] mb-4">
						Message:
					</label>
					<textarea
						id="msg"
						name="msg"
						required
						aria-label="username"
						className="h-[178px] border-2 border-[#929292] border-opacity-50 rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="flex flex-row justify-end w-full">
					<button
						type="submit"
						className="font-bold text-sm font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink cursor-pointer transition-transform transform duration-300  hover:scale-110"
					>
						Send Message
					</button>
				</div>
			</form>
		</section>
	);
}

export default Contact;
