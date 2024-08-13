import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Auth from './components/auth';
import Footer from './components/footer';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LogIn from './components/logIn';
import SignUp from './components/signUp';
import Cart from './components/cart';
import ProgramDetails from './components/program-details';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
	const [navbar, setNavbar] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const [sign, setSign] = useState(false);
	const [login, setLogin] = useState(false);
	const [cart, setCart] = useState(false);
	const [details, setDetails] = useState(false);
	const [programName, setProgramName] = useState("")


	useEffect(() => {
		AOS.init({ duration: 1000, offset: 0 });
	}, []);

	const modalsHandler = () => {
		if (overlay) {
			if (cart) {
				return (
					<div data-aos="fade-in"
						className="bg-very-dark-blue absolute  bg-opacity-50 w-[100%] h-[100%]  top-[0px] right-0 flex justify-end z-50">
						<Cart setOverlay={setOverlay} setCart={setCart} cart={cart} />
					</div>
				)
			}
			if (sign) {
				return (
					<div className=" bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10 z-50">
						<SignUp setOverlay={setOverlay} />
					</div>
				)
			}
			if (login) {
				return (
					<div className=" bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10 z-50">
						<LogIn setOverlay={setOverlay} />
					</div>
				)
			}
			if (navbar) {
				return (
					<div data-aos="fade-in"
						className=" bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10 ">
						<Navbar setOverlay={setOverlay} overlay={overlay} />
					</div>
				)
			}
			if (details) {
				return (
					<div data-aos="fade-in"
						className=" bg-very-dark-blue bg-opacity-50 w-[100%] h-[100%] absolute top-[175px] right-0 flex justify-center pt-10 z-50">
						<ProgramDetails setOverlay={setOverlay} name={programName} setDetails={setDetails} setProgramName={setProgramName} />
					</div>
				)
			}
		}
		return null
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center overflow-hidden max-w-7xl  mx-auto">
			<div className="  w-full  mx-auto relative flex flex-col justify-center items-center ">
				<BrowserRouter>
					<Navbar
						setNavbar={setNavbar}
						setOverlay={setOverlay}
						setSign={setSign}
						setCart={setCart}
						setLogin={setLogin}
						navbar={navbar}
					/>
					<Routes>
						<Route path="/" element={<Home setDetails={setDetails} setOverlay={setOverlay} setProgramName={setProgramName} />} />
						<Route path="/auth" element={<Auth />} />
					</Routes>
					<Footer />
					{modalsHandler()}
				</BrowserRouter>
			</div >
		</div >
	);
}

export default App;
