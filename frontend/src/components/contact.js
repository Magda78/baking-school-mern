function Contact() {
	return (
		<section className="px-[304px] py-[48px]">
			<form className="flex flex-col justify-between">
				<div className="flex flex-row justify-center items-center">
					<div className="flex-1 mr-24">
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
							<label for="emaul" className="font-bold text-base font-Nunito text-dark-blue mb-4">
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
					</div>
					<div className="flex-1">
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
				<div className="flex flex-col">
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
				<div className="flex flex-col items-end mt-16">
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
