import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	cartExpiration: null
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},

		removeFromBasket: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},


		clearCart: (state, action) => {
			state.items = []
		}
	}
});

export const { addToBasket, removeFromBasket, expiration, clearCart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
