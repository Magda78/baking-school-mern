import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

function CartItem({ item }) {
	const { program, students, date, price } = item;
	return (
		<section>
			<div className="flex items-center justify-between py-4">
				<h2 className="w-[10px] font-normal text-xs font-Nunito uppercase text-dark-blue">{program}</h2>
				<h2 className=" w-[10px] font-normal text-xs font-Nunito uppercase text-dark-blue">{students}</h2>
				<h2 className=" w-[10px] font-normal text-xs font-Nunito uppercase text-dark-blue">{date}</h2>
				<h2 className="w-[10px] font-normal text-xs font-Nunito uppercase text-dark-blue">${price}</h2>
				<DeleteForeverOutlinedIcon className="font-normal text-xs font-Nunito uppercase text-pink cursor-pointer hover:text-light-pink" />
			</div>
		</section>
	);
}

export default CartItem;
