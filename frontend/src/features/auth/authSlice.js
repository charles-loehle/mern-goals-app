import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register user
export const register = createAsyncThunk(
	// this is not a url. it is a prefix for the generated action type
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			console.log('error from authSlice register');

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Login user
export const login = createAsyncThunk(
	// this is not a url. it is a prefix for the generated action type
	'auth/login',
	async (user, thunkAPI) => {
		try {
			return await authService.login(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// in Redux dev tools:
		// auth/reset
		reset: state => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			// auth/register/pending
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			// auth/register/fulfilled
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			// auth/register/rejected
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// auth/register/pending
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			// auth/login/fulfilled
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			// auth/login/rejected
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// auth/logout/fulfilled
			.addCase(logout.fulfilled, state => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
