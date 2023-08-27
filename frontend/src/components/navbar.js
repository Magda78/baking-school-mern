import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../store/cartSllice';


function Navbar({ screenSize, setNavbar, setOverlay, setSign, setLogin, setCart }) {
	const [ hamburger, setHamburger ] = useState(true);
	const [ hover, setHover ] = useState(false);
	const basketItems = useSelector(selectItems);
	

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
		setSign(false);
		setLogin(true);
	};

	const overlayHandlerSignUp = () => {
		setOverlay(true);
		setSign(true);
		setLogin(false);
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
					<h2 className="font-bold text-sm font-Nunito uppercase text-pink cursor-pointer hover:text-light-blue">
						Home
					</h2>
					<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Programs
					</h2>
					<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Galery
					</h2>
					<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
						Contact Us
					</h2>
					<div className="relative">
						<ShoppingCartOutlinedIcon
							className="font-bold text-sm text-dark-blue cursor-pointer hover:text-light-blue"
							onClick={() => {
								setLogin(false);
								setSign(false);
								setCart(true);
								setOverlay(true);
							}}
						/>
						<div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-pink text-white rounded-full p-2 text-xs">
							{basketItems.length}
						</div>
					</div>

					<div className="relative" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
						<PersonOutlineOutlinedIcon className="font-bold text-sm text-dark-blue cursor-pointer hover:text-light-blue " />

						{hover ? (
							<div
								className="absolute top-0 right-0 pt-8 flex flex-col  justify-center items-end  "
								onMouseEnter={mouseEnterHandler}
								onMouseLeave={mouseLeaveHandler}
							>
								<p
									onClick={overlayHandlerLogIn}
									className="font-bold text-sm font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue mb-1"
								>
									LogIn
								</p>
								<p
									onClick={overlayHandlerSignUp}
									className="font-bold text-sm font-Nunito uppercase  text-dark-blue cursor-pointer hover:text-light-blue"
								>
									SignUp
								</p>
							</div>
						) : null}
					</div>
				</div>
			) : hamburger ? (
				<MenuOutlinedIcon
					className="font-bold text-sm text-dark-blue cursor-pointer hover:text-light-blue"
					onClick={hamburgerMenuHandler}
				/>
			) : (
				<div>
					<CloseOutlinedIcon
						className="font-bold text-sm text-dark-blue cursor-pointer hover:text-light-blue"
						onClick={hamburgerMenuHandler}
					/>
				</div>
			)}
		</section>
	);
}

export default Navbar;
