function Contact() {
	return (
		<section className="flex flex-col justify-center py-[48px]  sm:px-[47px] md:px-[47px]">
			<form className="flex flex-col justify-between items-center sm:items-start">
				<div className="flex flex-col justify-between items-center sm:items-start sm:w-full">
					<div className="flex flex-row sm:flex-col sm:w-full">
						<div className="flex flex-col mr-24 flex-1  sm:mr-0">
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

						<div className="flex flex-col flex-1 sm:w-full">
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
					</div>
					<div className="flex flex-row sm:flex-col sm:w-full">
						<div className="flex flex-col mr-24 sm:mr-0 ">
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

						<div className="flex flex-col sm:w-full">
							<label for="phone" className="font-bold text-base font-Nunito text-dark-blue mb-4">
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
					<label for="msg" className="font-bold text-base font-Nunito text-dark-blue mb-4">
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
						className="font-bold text-sm font-Nunito py-6 px-10 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink"
					>
						Send Message
					</button>
				</div>
			</form>
		</section>
	);
}

export default Contact;
