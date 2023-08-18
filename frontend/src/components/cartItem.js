import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../store/cartSllice';

function CartItem({ item }) {
	const { id, program, students, date, price } = item;
    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        dispatch(removeFromBasket(id));
        console.log('click',id)
    }
	return (
		<section>
			<div className="grid grid-cols-5 text-center py-4 gap-2">
				<h2 className="font-normal text-xs font-Nunito uppercase text-dark-blue">{program}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-dark-blue">{students}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-dark-blue">{date}</h2>
				<h2 className=" font-normal text-xs font-Nunito uppercase text-dark-blue">${price}</h2>
				<DeleteForeverOutlinedIcon className="font-normal text-xs font-Nunito uppercase text-pink cursor-pointer hover:text-light-pink" onClick={() => deleteHandler(item.id)} />
			</div>
		</section>
	);
}

export default CartItem;
