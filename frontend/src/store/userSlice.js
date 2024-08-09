import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: []
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.user = [...state.user, action.payload];
		},
		removeUser: (state, action) => {
			state.user = state.user.filter((item) => item.id !== action.payload)
		}
	}
});

export const { addUser, removeUser } = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
