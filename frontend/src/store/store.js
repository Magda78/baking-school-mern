import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSllice';
import userReducer from '../store/userSlice';
import availabilitiesReducer from '../store/availabilitiesSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
		availabilities: availabilitiesReducer
	}
});

export default store;
