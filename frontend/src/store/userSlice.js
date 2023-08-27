import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: []
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.user = [ ...state.user, action.payload ];
		}
	}
});

export const { addUser } = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
