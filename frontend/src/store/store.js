import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSllice';
import userReducer from '../store/userSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer
	}
});

export default store;
