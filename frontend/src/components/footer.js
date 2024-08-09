import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

function Footer() {
	return (
		<section className=" w-full  lg:py-12 lg:px-[127px] xl:px-8 bg-gradient-to-r from-bg text-[#929292] 
		flex flex-col  xl:flex-row  xl:justify-between items-center justify-center py-10">
			<div className='flex flex-col justify-center items-center'>
				<div className="mb-6">
					<img src="/img/small-logo.png" alt="logo" />
				</div>
				<div className='flex flex-col justify-center items-center text-[#798DD8]'>
					<h2 className="font-bold text-base font-Nunito  mb-2">215 Clinton Ave</h2>
					<h2 className="font-bold text-base font-Nunito  mb-2">11205 Brooklyn</h2>
					<h2 className="font-bold text-base font-Nunito ">NY</h2>
				</div>
			</div>
			<div className='flex flex-col  justify-center items-center mt-6 xl:flex-row xl:mt-0'>
				<div className='xl:mr-32'>
					<h2 className="font-bold text-2xl font-Nunito  mb-4 text-[#313957]">Social</h2>
					<div className='text-[#798DD8]'>
						<h2 className="font-bold text-base font-Nunito  hover:text-light-blue cursor-pointer mb-2">
							Facebook
						</h2>
						<h2 className="font-bold text-base font-Nunito  hover:text-light-blue cursor-pointer">
							Instagram
						</h2>
					</div>
				</div>
				<div className='flex flex-col justify-center items-center xl:items-start'>
					<div className="font-bold text-2xl font-Nunito text-[#313957] mb-4 mt-6  xl:mt-0">
						Contact Us
					</div>
					<div className="flex flex-row mb-2 justify-center items-center text-[#798DD8]">
						<EmailOutlinedIcon className="font-bold text-base font-Nunito  mr-2 " />
						<h2 className="font-bold text-base font-Nunito  hover:text-light-blue cursor-pointer">
							BrooklynSchoolOfBaking@gmail.com
						</h2>
					</div>
					<div className="flex flex-row justify-center items-center text-[#798DD8]">
						<LocalPhoneOutlinedIcon className="font-bold text-base font-Nunito  mr-2 " />
						<h2 className="font-bold text-base font-Nunito  hover:text-light-blue cursor-pointer">
							555-555-5555
						</h2>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
