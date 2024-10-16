import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getAccountInfo = createAsyncThunk("account/getAccountInfo", async () => {
    const response = await axiosInstance.get('/me')
    if (response.status === 200) {  
        return response.data 
      } else {  
        throw new Error("Failed getting account information");  
      } 
  });


  export const editAccountInfo = createAsyncThunk("account/editAccountInfo", async (newData) => {
    const response = await axiosInstance.put('/me', newData)
    if (response.status === 200) {  
        return response.data
      } else {  
        throw new Error("Failed updating user information");  
      } 
  })

const initialState= {  
    accountInfo: null, 
    loading: false,  
    error: null,
    successMessage: '',  
    errorMessage: '',
    loadingEditting: false
  }

  const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {  
      clearMessages: (state) => {  
          state.successMessage = '';  
          state.errorMessage = '';  
      },  
  },  
    extraReducers: (builder) => {
        builder.addCase(getAccountInfo.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAccountInfo.fulfilled, (state, action) => {
            state.loading = false
            state.accountInfo = action.payload
        })
        builder.addCase(getAccountInfo.rejected, (state, action) => {
            state.loading = false
            state.accountInfo = null
            state.error = action.error.message;
        })
        builder.addCase(editAccountInfo.pending, (state) => {
          state.loadingEditting = true
          state.successMessage = '';  
          state.errorMessage = ''; 
      })
        builder.addCase(editAccountInfo.fulfilled, (state) => {
          state.loadingEditting = false
          state.successMessage = 'your account information updated successfully!'
        })
        builder.addCase(editAccountInfo.rejected, (state) => {
          state.loadingEditting = false
          state.errorMessage = 'Failed to update your account information';
        })
    }
  })

  export const { clearMessages } = accountSlice.actions; 
  export default accountSlice.reducer