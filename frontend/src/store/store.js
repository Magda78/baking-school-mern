import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSllice';

const store = configureStore({
	reducer: {
		cart: cartReducer
	}
});

export default store;
