import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';

function Navbar({ screenSize, setNavbar, setOverlay, setSign }) {
	const [ hamburger, setHamburger ] = useState(true);
	const [ hover, setHover ] = useState(false);

	const hamburgerMenuHandler = () => {
		if (hamburger === true) {
			setHamburger(false);
			setNavbar(true);
		} else {
			setHamburger(true);
			setNavbar(false);
		}
	};

	const overlayHandlerLogIn = () => {
		setOverlay(true);
		setSign(false)
	};

	const overlayHandlerSignUp = () => {
		setOverlay(true);
		setSign(true);
	};

	const mouseEnterHandler = () => {
		setHover(true);
	};

	const mouseLeaveHandler = () => {
		setHover(false);
	};

	return (
		<section className="px-[127px] py-12 flex flex-row items-center justify-between sm:px-[47px] md:px-[47px]">
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

					<div className="relative" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
						<PersonOutlineOutlinedIcon className="font-bold text-base text-dark-blue cursor-pointer hover:text-light-blue" />

						{hover ? (
							<div
								className="absolute top-0 right-0 pt-8 flex flex-col  justify-center items-end"
								onMouseEnter={mouseEnterHandler}
								onMouseLeave={mouseLeaveHandler}
							>
								<p
									onClick={overlayHandlerLogIn}
									className="font-bold text-xs font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue mb-1"
								>
									LogIn
								</p>
								<p
									onClick={overlayHandlerSignUp}
									className="font-bold text-xs font-Nunito uppercase  text-dark-blue cursor-pointer hover:text-light-blue"
								>
									SignUp
								</p>
							</div>
						) : null}
					</div>
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
