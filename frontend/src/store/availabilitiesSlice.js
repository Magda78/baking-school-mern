import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	isFetched: false
};

export const availabilitiesSlice = createSlice({
	name: 'availabilities',
	initialState,
	reducers: {
		addToDate: (state, action) => {
			state.items = [ ...state.items, action.payload ];
			state.isFetched = true;
		},

		updateAvailability: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id);
			if (index !== -1) {
			  state.items[index] = action.payload;
			}
		  },
	}
});

export const { addToDate, updateAvailability } = availabilitiesSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.availabilities.items;
export const selectIsFetched = (state) => state.availabilities.isFetched;
//export const selectAll = (state) => state.availabilities.items.reduce((total, item) => total + item.price, 0);

export default availabilitiesSlice.reducer;
