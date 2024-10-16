import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios.jsx'

export const login = createAsyncThunk("auth/login", async (userData) => {
    const response = await axiosInstance.post('/login', userData)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed logging in");  
      } 
  });

  export const logout = createAsyncThunk("auth/logout", async () => {
    const response = await axiosInstance.post('/logout')
    if (response.status === 200) {  
        console.log(response) 
      } else {  
        throw new Error("Failed logging out");  
      } 
  });

const initialState= {  
    user: null,
    roles: null,  
    token: null,
    isAuthenticated: false,   
    loading: false,  
    error: null,  
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.name
            state.roles = action.payload.roles[0]
            state.isAuthenticated = true
            const { access_token } = action.payload;
            state.token = access_token
            localStorage.setItem('token', access_token)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.token = null
            state.error = action.error.message;
        })

        builder.addCase(logout.fulfilled, (state) => {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        })
    }
})

export default authSlice.reducer