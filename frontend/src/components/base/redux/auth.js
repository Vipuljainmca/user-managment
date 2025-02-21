import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoggedIn: false,
    token : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        console.log("user login", action.payload);
    },
    logout(state) {
        state.user = null;
        state.isLoggedIn = false;
        state.token = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer