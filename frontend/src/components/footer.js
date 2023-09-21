import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

function Footer() {
	return (
		<section className=" w-full py-12 px-[127px] bg-midium-blue flex sm:flex-col md:flex-col lg:flex-col 2xl:flex-row justify-between sm:px-[47px] md:px-[47px]">
			<div>
				<div className="mb-6">
					<img src="/img/small-logo.png" alt="logo" />
				</div>
				<div>
					<h2 className="font-bold text-base font-Nunito text-dark-blue mb-2">215 Clinton Ave</h2>
					<h2 className="font-bold text-base font-Nunito text-dark-blue mb-2">11205 Brooklyn</h2>
					<h2 className="font-bold text-base font-Nunito text-dark-blue">NY</h2>
				</div>
			</div>
			<div className="flex sm:flex-col sm:space-x-0 sm:mt-6 md:flex-col md:space-x-0 md:mt-6 lg:flex-col lg:mt-6 lg:space-x-0 2xl:flex-row 2xl:space-x-28">
				<div>
					<h2 className="font-bold text-2xl font-Nunito text-very-dark-blue mb-4">Social</h2>
					<div>
						<h2 className="font-bold text-base font-Nunito text-dark-blue hover:text-light-blue cursor-pointer mb-2">
							Facebook
						</h2>
						<h2 className="font-bold text-base font-Nunito text-dark-blue hover:text-light-blue cursor-pointer">
							Instagram
						</h2>
					</div>
				</div>
				<div>
					<div className="font-bold text-2xl font-Nunito text-very-dark-blue mb-4 sm:mt-6 md:mt-6 lg:mt-6">
						Contact Us
					</div>
					<div className="flex flex-row mb-2">
						<EmailOutlinedIcon className="font-bold text-base font-Nunito text-dark-blue mr-2 " />
						<h2 className="font-bold text-base font-Nunito text-dark-blue hover:text-light-blue cursor-pointer">
							BrooklynSchoolOfBaking@gmail.com
						</h2>
					</div>
					<div className="flex flex-row">
						<LocalPhoneOutlinedIcon className="font-bold text-base font-Nunito text-dark-blue mr-2 " />
						<h2 className="font-bold text-base font-Nunito text-dark-blue hover:text-light-blue cursor-pointer">
							555-555-5555
						</h2>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
