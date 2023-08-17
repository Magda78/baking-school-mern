import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { selectTotal, selectItems } from '../store/cartSllice';
import CartItem from '../components/cartItem';

function Cart({ setCart, cart }) {
	const total = useSelector(selectTotal);
	const basketItems = useSelector(selectItems);
	return (
		<section
			className={`w-[40%] h-screen bg-white p-10 flex flex-col fixed transition-all duration-500 ease-in-out ${cart
				? 'right-0 '
				: '-right-full'} `}
		>
			<div className="flex justify-end cursor-pointer mb-10">
				<CloseOutlinedIcon
					onClick={() => setCart(false)}
					className="font-bold text-sm text-dark-blue cursor-pointer hover:text-light-blue"
				/>
			</div>
			{basketItems.length === 0 ? (
				<div className="flex justify-center items-center flex-1">
					<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue  ">Your cart is empty</h2>
				</div>
			) : (
				<div className="grid grid-rows-[50px,1fr,50px]">
					<div className="grid grid-cols-5 auto-col-max border-b-2 border-pink py-4 text-center gap-2">
						<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue">Program</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue">Qty.</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue">Date</h2>
						<h2 className="font-bold text-sm font-Nunito uppercase text-dark-blue">Price</h2>
						<h2 />
					</div>
					<div >{basketItems.map((item) => <CartItem item={item} />)}</div>
					<div className="flex items-center justify-between border-t-2 border-pink py-4">
						<h2 className="font-bold text-md font-Nunito uppercase text-dark-blue">Total:</h2>
						<h2 className="font-bold text-md font-Nunito uppercase text-dark-blue">${total}</h2>
					</div>
				</div>
			)}
		</section>
	);
}

export default Cart;
