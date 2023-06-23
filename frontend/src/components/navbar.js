import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';

function Navbar({ screenSize, setOverlay }) {
	const [ hamburger, setHamburger ] = useState(true);

	const hamburgerMenuHandler = () => {
		if (hamburger === true) {
			setHamburger(false);
			setOverlay(true);
		} else {
			setHamburger(true);
            setOverlay(false)
		}
	};
	return (
		<section className="px-[127px] py-[48px] flex flex-row items-center justify-between">
			<div>
				<img src="/img/logo.png" alt="logo" />
			</div>

			{screenSize === '2xl' || screenSize === '3xl' ? (
				<div className="flex items-center space-x-[72px]">
					<h2 className="font-bold text-base font-Nunito uppercase text-pink cursor-pointer hover:text-light-blue">
						Home
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Programs
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Galery
					</h2>
					<h2 className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Contact Us
					</h2>
					<ShoppingCartOutlinedIcon className="font-bold text-base text-dark-blue cursor-pointer hover:text-light-blue" />
					<button className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink">
						Log In
					</button>
				</div>
			) : hamburger ? (
				<MenuOutlinedIcon
					className="font-bold text-base text-dark-blue cursor-pointer hover:text-light-blue"
					onClick={hamburgerMenuHandler}
				/>
			) : (
				<div>
					<CloseOutlinedIcon
						className="font-bold text-base text-dark-blue cursor-pointer hover:text-light-blue"
						onClick={hamburgerMenuHandler}
					/>
				</div>
			)}
		</section>
	);
}

export default Navbar;
