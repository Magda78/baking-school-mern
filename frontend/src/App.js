import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Auth from './components/auth';
import Footer from './components/footer';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LogIn from './components/logIn';
import SignUp from './components/signUp';
import Cart from './components/cart';

function App() {
	const [ screenSize, setScreenSize ] = useState('');
	const [ navbar, setNavbar ] = useState(false);
	const [ overlay, setOverlay ] = useState(false);
	const [ sign, setSign ] = useState(false);
	const [ login, setLogin ] = useState(false);
	const [ cart, setCart ] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				setScreenSize('sm');
			} else if (640 < window.innerWidth && window.innerWidth <= 768) {
				setScreenSize('md');
			} else if (768 < window.innerWidth && window.innerWidth <= 1024) {
				setScreenSize('lg');
			} else if (1024 < window.innerWidth && window.innerWidth <= 1280) {
				setScreenSize('xl');
			} else if (1280 < window.innerWidth && window.innerWidth <= 1440) {
				setScreenSize('2xl');
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="max-w-[1440px] relative flex flex-col justify-center ">
			<BrowserRouter>
				<Navbar
					screenSize={screenSize}
					setNavbar={setNavbar}
					setOverlay={setOverlay}
					setSign={setSign}
					setCart={setCart}
					setLogin={setLogin}
				/>
				<Routes>
					<Route path="/" element={<Home screenSize={screenSize} />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
				<Footer />
				{cart && overlay ? (
					<div className="bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[0px] right-0 flex justify-end">
						<Cart setOverlay={setOverlay} setCart={setCart} cart={cart} />
					</div>
				) : (
					console.log('cart close')
				)}
				{overlay && sign ? (
					<div className="bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10">
						<SignUp setOverlay={setOverlay} />
					</div>
				) : overlay && login ? (
					<div className="bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10">
						<LogIn setOverlay={setOverlay} />
					</div>
				) : null}
				{navbar ? (
					<div className="bg-white w-[85%] h-screen py-[45px] pr-[127px]  absolute top-[140px] right-0 flex flex-col items-end leading-6">
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
						<Link
							to="/auth"
							className="font-bold text-base font-Nunito uppercase text-dark-blue cursor-pointer hover:text-light-blue"
						>
							LogIn
						</Link>
					</div>
				) : null}
			</BrowserRouter>
		</div>
	);
}

export default App;
