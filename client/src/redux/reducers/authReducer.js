import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../actions/authAcitons";

const authSlice = createSlice({
    name: "authrd",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isMessage: null
    },
    reducers: {
        reset: (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isMessage = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state, action) =>{
            state.isLoading = true
            localStorage.removeItem('token')
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            localStorage.setItem('token', action.payload)
        })
        .addCase(login.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.isMessage = action.payload
        })
        .addCase(signUp.pending, (state, action) =>{
            state.isLoading = true
            localStorage.removeItem('token')
        })
        .addCase(signUp.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            localStorage.setItem('token', action.payload)
        })
        .addCase(signUp.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.isMessage = action.payload
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer