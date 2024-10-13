import { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { selectTotal, selectItems } from '../store/cartSllice';
import { selectUser } from '../store/userSlice';
import CartItem from '../components/cartItem';
//import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//import { checkout } from '../../../routes/orders';
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function Cart({ setCart, cart, setOverlay }) {
	const total = useSelector(selectTotal);
	const basketItems = useSelector(selectItems);
	const [alert, setAlert] = useState(false)
	const user = useSelector(selectUser);
	const [clientSecret, setClientSecret] = useState('');


	const createCheckoutSession = async () => {

		console.log('alert,', alert)
		console.log(stripePromise);
		const stripe = await stripePromise;
		try {
			const response = await fetch('http://localhost:3001/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ basketItems, user })
			});

			const checkoutSession = await response.json();
			const { sessionId } = checkoutSession;
			const result = await stripe.redirectToCheckout({
				sessionId: sessionId
			});
			if (result.error) {
				alert(result.error.message);
			}
			//const data = await response.json();
			//setClientSecret(data.clientSecret);
		} catch (error) {
			console.error(error);
		}
	};



	return (
		<section data-aos={cart ? "fade-left" : "fade-in"}
			className={` top-0  w-[40%] h-[100%] bg-white p-10 flex flex-col z-20 fixed `}
		>
			<div className="flex justify-end cursor-pointer mb-10">
				<CloseOutlinedIcon
					onClick={() => {
						setCart(false);
						setOverlay(false);
					}}
					className="font-bold text-sm text-[#929292] cursor-pointer hover:text-light-blue"
				/>
			</div>
			{basketItems.length === 0 ? (
				<div className="flex h-screen justify-center items-center">
					<h2 className="font-bold text-sm font-Nunito uppercase text-[#929292] ">Your cart is empty</h2>
				</div>
			) : (
				<div className="grid grid-rows-[50px,1fr,50px]">
					<div className="grid grid-cols-5 auto-col-max border-b-2 border-pink py-4 text-center gap-2">
						<h2 className="font-bold text-sm font-Nunito uppercase text-[#929292]">Program</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-[#929292]">Qty.</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-[#929292]">Date</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-[#929292]">Price</h2>
						<h2 />
					</div>
					<div>{basketItems.map((item) => <CartItem item={item} key={item.id} />)}</div>
					<div className="flex items-center justify-between border-t-2 border-pink py-4">
						<h2 className="font-bold text-md font-Nunito uppercase text-[#929292]">Total:</h2>
						<h2 className="font-bold text-md font-Nunito uppercase text-[#929292]">${total}</h2>
					</div>
					<div className='flex justify-end'>
						<button
							onClick={createCheckoutSession}
							type="submit"
							className="font-bold text-base font-Nunito py-4 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink mt-8 w-[40%] transition-transform transform duration-300  hover:scale-110"
						>
							Checkout
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default Cart;
