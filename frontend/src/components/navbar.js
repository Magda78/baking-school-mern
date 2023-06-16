import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Navbar() {
	return (
		<section className="px-[154px] py-[45px] flex flex-row items-center justify-between">
			<div>
				<img src="/img/logo.png" alt="logo" />
			</div>
			<div className="flex items-center space-x-[72px]">
				<h2 className="font-bold text-base font-Nunito uppercase text-pink cursor-pointer hover:text-light-blue">Home</h2>
				<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">Programs</h2>
				<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">Galery</h2>
				<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">Contact Us</h2>
				<ShoppingCartOutlinedIcon className="font-bold text-base text-dark-blue cursor-pointer hover:text-light-blue"/>
				<button className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px]">
					Log In
				</button>
			</div>
		</section>
	);
}

export default Navbar;
