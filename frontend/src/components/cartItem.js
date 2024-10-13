import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../store/cartSllice';
import { removeDate } from '../store/availabilitiesSlice';

function CartItem({ item }) {
	const { id, program, students, date, price } = item;
	const dispatch = useDispatch();
	const deleteHandler = (id) => {
		dispatch(removeFromBasket(id));
		console.log('click', id);
		dispatch(removeDate(id))
	};
	return (
		<section>
			<div className="grid grid-cols-5 text-center py-4 gap-2 items-center">
				<h2 className="font-normal text-xs font-Nunito uppercase text-[#929292] text-left">{program}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-[#929292] ">{students}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-[#929292] ">{date}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-[#929292] ">${price}</h2>
				<div className='flex justify-end'>
					<DeleteForeverOutlinedIcon
						className="font-normal text-xs font-Nunito uppercase text-pink cursor-pointer hover:text-light-pink"
						onClick={() => deleteHandler(item.id)}
					/>
				</div>

			</div>
		</section>
	);
}

export default CartItem;
