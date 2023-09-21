function Contact() {
	return (
		<section data-aos="zoom-in" data-aos-offset="350" data-delay="300" id="contactUs" className="flex flex-col justify-center py-[48px]  sm:px-[47px] md:px-[47px]">
			<form className="flex flex-col justify-between items-center sm:items-start">
				<div className="flex flex-col justify-between items-center sm:items-start sm:w-full">
					<div className="flex flex-row sm:flex-col sm:w-full">
						<div className="flex flex-col mr-24 flex-1  sm:mr-0">
							<label htmlFor="userName" className="font-bold text-base font-Nunito text-dark-blue mb-4">
								First Name:
							</label>
							<input
								type="text"
								id="userName"
								name="userName"
								aria-required="true"
								aria-label="userName"
								className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>

						<div className="flex flex-col flex-1 sm:w-full">
							<label htmlFor="lastName" className="font-bold text-base font-Nunito text-dark-blue mb-4">
								Last Name:
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								aria-required="true"
								aria-label="lastName"
								className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>
					</div>
					<div className="flex flex-row sm:flex-col sm:w-full">
						<div className="flex flex-col mr-24 sm:mr-0 ">
							<label htmlFor="Email" className="font-bold text-base font-Nunito text-dark-blue mb-4">
								Email:
							</label>
							<input
								type="email"
								id="Email"
								name="Email"
								aria-required="true"
								aria-label="Email"
								className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>

						<div className="flex flex-col sm:w-full">
							<label htmlFor="phone" className="font-bold text-base font-Nunito text-dark-blue mb-4">
								Phone number:
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								placeholder="XXX-XXX-XXXX"
								required
								className="border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-[518px] justify-center sm:w-full">
					<label htmlFor="msg" className="font-bold text-base font-Nunito text-dark-blue mb-4">
						Message:
					</label>
					<textarea
						id="msg"
						name="msg"
						aria-required="true"
						aria-label="username"
						className="h-[178px] border-2 border-grayish rounded mb-8 text-base px-4 py-2 outline-none text-very-dark-blue focus:border-light-blue"
					/>
				</div>
				<div className="w-[518px] flex flex-row justify-end sm:w-full">
					<button
						type="submit"
						className="font-bold text-sm font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink transition-transform transform duration-300  hover:scale-110"
					>
						Send Message
					</button>
				</div>
			</form>
		</section>
	);
}

export default Contact;
