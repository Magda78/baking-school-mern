import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems } from '../store/cartSllice';
import { removeUser, selectUser } from "../store/userSlice";
import { Link } from 'react-scroll';

function Navbar({ setNavbar, setOverlay, setSign, setLogin, setCart, navbar, overlay }) {
	const [hamburger, setHamburger] = useState(true);
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const basketItems = useSelector(selectItems);
	const user = useSelector(selectUser);

	const hamburgerMenuHandler = () => {
		console.log('hamburger', hamburger)
		console.log('menu', navbar)
		setLogin(false)
		setSign(false)
		setHamburger(!hamburger);
		setNavbar(!navbar);
		setOverlay(true)
	};

	const overlayHandlerLogIn = () => {
		setOverlay(true);
		setSign(false);
		setLogin(true);
		setNavbar(false)
		setHamburger(true)
	};

	const overlayHandlerSignUp = () => {
		setOverlay(true);
		setSign(true);
		setLogin(false);
		setNavbar(false)
		setHamburger(true)
	};

	const mouseEnterHandler = () => {
		setHover(true);
	};

	const mouseLeaveHandler = () => {
		setHover(false);
	};

	const underLineHandler = () => {
		setActive(true);
		setActive(false);
	};

	const logoutHandler = () => {
		if (user && user.length > 0) {
			dispatch(removeUser(user[0].id));
		}
	};

	return (
		<section
			data-aos="fade-down"
			data-aos-delay="600"
			className="w-full z-40 sticky top-0 bg-transparent  py-12 flex flex-row items-center justify-between px-16 "
		>
			<div>
				<img src="/img/logo.png" alt="logo" />
			</div>

			{/* Desktop Navigation */}
			<div className="hidden xl:flex xl:items-center xl:space-x-[72px]">
				<Link
					onClick={underLineHandler}
					to="hero"
					spy={true}
					smooth={true}
					offset={-120}
					duration={500}
					className={`font-bold text-sm font-Nunito uppercase text-pink cursor-pointer hover:text-light-blue ${active ? 'border border-2-pink' : ''}`}
				>
					Home
				</Link>
				<Link
					to="programs"
					spy={true}
					smooth={true}
					offset={-150}
					duration={500}
					className={`font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue ${active ? 'border border-2-pink' : ''}`}
				>
					Programs
				</Link>
				<Link
					to="galery"
					spy={true}
					smooth={true}
					offset={-120}
					duration={500}
					className="font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue"
				>
					Galery
				</Link>
				<Link
					to="contactUs"
					spy={true}
					smooth={true}
					offset={-150}
					duration={500}
					delay={1000}
					className="font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue"
				>
					Contact Us
				</Link>
				<Link
					to="about"
					spy={true}
					smooth={true}
					offset={-150}
					duration={500}
					className="font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue"
				>
					About Us
				</Link>
				<div className="relative">
					<ShoppingCartOutlinedIcon
						className="font-bold text-sm text-[#929292] cursor-pointer hover:text-light-blue"
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
				{user && user.length > 0 ? (
					<button
						onClick={logoutHandler}
						className="text-sm text-white font-bold py-2.5 px-4 rounded-[10px] hover:bg-light-blue font-Nunito uppercase bg-pink"
					>
						Log Out
					</button>
				) : (
					<div
						className="relative"
						onMouseEnter={mouseEnterHandler}
						onMouseLeave={mouseLeaveHandler}
					>
						<PersonOutlineOutlinedIcon className="font-bold text-sm text-[#929292] cursor-pointer hover:text-light-blue" />
						{hover && (
							<div
								data-aos="flip-left"
								className="absolute top-0 right-0 pt-8 flex flex-col justify-center items-end"
								onMouseEnter={mouseEnterHandler}
								onMouseLeave={mouseLeaveHandler}
							>
								<p
									onClick={overlayHandlerLogIn}
									className="font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue mb-1"
								>
									Log In
								</p>
								<p
									onClick={overlayHandlerSignUp}
									className="font-bold text-sm font-Nunito uppercase text-[#929292] cursor-pointer hover:text-light-blue"
								>
									Sign Up
								</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Mobile Menu Icon */}
			<div className="sm:inline md:inline lg:inline xl:hidden sm:px-8 md:px-8 lg:pl-16 lg:pr-8">
				{hamburger ? (
					<MenuOutlinedIcon
						className="font-bold text-sm text-[#798DD8] cursor-pointer hover:text-light-blue"
						onClick={hamburgerMenuHandler}
					/>
				) : (
					<>
						<CloseOutlinedIcon
							className="font-bold text-sm text-[#798DD8] cursor-pointer hover:text-light-blue"
							onClick={hamburgerMenuHandler}
						/>
						<div className="bg-white w-[85%] h-screen py-[45px] pr-16 space-y-4 absolute top-[140px] right-0 flex flex-col items-end leading-6 z-40">
							<Link to='hero' onClick={hamburgerMenuHandler} className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
								Home
							</Link>
							<Link to='programs' onClick={hamburgerMenuHandler} className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
								Programs
							</Link>
							<Link to='galery' onClick={hamburgerMenuHandler} className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
								Galery
							</Link>
							<Link to='contactUs' onClick={hamburgerMenuHandler} className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue">
								Contact Us
							</Link>


							{user && user.length > 0 ? (
								<button
									onClick={logoutHandler}
									className="text-sm text-white font-bold py-2.5 px-4 rounded-[10px] hover:bg-light-blue font-Nunito uppercase bg-pink"
								>
									Log Out
								</button>
							) : (
								<div className="flex flex-col space-y-4 text-right">
									<Link
										onClick={overlayHandlerLogIn}
										className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue"
									>
										Log In
									</Link>
									<Link
										onClick={overlayHandlerSignUp}
										className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue"
									>
										Sign Up
									</Link>

								</div>
							)
							}
						</div>
					</>

				)}

			</div>

		</section>
	);
}

export default Navbar;

