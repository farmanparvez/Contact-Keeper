import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('login/authLogin',  async (data, thunkAPI) => {
    try {
        const res = await axios.post('/login', data)
        // console.log(res.data.token)
        return res.data.token
    } catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const signUp = createAsyncThunk('signUp/authSignUp',  async (data, thunkAPI) => {
    try {
        const res = await axios.post('/signup', data)
        return res.data.token
    } catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// export const logout = createAsyncThunk('logout/authLogout',  async (data, thunkAPI) => {
//     try {
//         const res = await axios.post('/signup', data)
//         // console.log(res.data.token)
//         return res.data.token
//     } catch (error) {
//         const message = error?.response?.data?.message || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })