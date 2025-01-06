import { createSlice } from "@reduxjs/toolkit";
import { getBearerToken } from "../services/api-actions";

// Retrieve values from localStorage
const token = getBearerToken();
const user = JSON.parse(localStorage.getItem("user")) || null;
const userId = localStorage.getItem("userId") || null;

const initialState = {
	token: token,
	isLoggedIn: !!token,
	user: user,
	userId: userId,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.isLoggedIn = true;
			state.token = action.payload.access;
			state.user = action.payload.user;
			state.userId = action.payload.user_id;
			localStorage.setItem("token", action.payload.access);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			localStorage.setItem("userId", action.payload.user_id);
		},
		logout(state) {
			state.isLoggedIn = false;
			state.token = null;
			state.user = null;
			state.userId = null;
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("userId");
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
