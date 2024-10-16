import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const editPasswordInfo = createAsyncThunk("editPassword/editPasswordInfo", async (newData) => {
    const response = await axiosInstance.put('/me/password', newData)
    if (response.status === 200) {  
        return response.data
      } else {  
        throw new Error("Failed updating Password");  
      } 
  })

  const initialState= {   
    loading: false,  
    successMessage: '',
    errorMessage: '',
  }

  const editPasswordSlice = createSlice({
    name: 'editPassword',
    initialState,
    reducers: {  
        clearMessages: (state) => {  
            state.successMessage = '';  
            state.errorMessage = '';  
        },  
    },  
    extraReducers: (builder) => {
        builder.addCase(editPasswordInfo.pending, (state) => {
            state.loading = true
            state.successMessage = '';  
            state.errorMessage = ''; 
        })
        builder.addCase(editPasswordInfo.fulfilled, (state) => {
            state.loading = false
            state.successMessage = 'your password updated successfully!'
        })
        builder.addCase(editPasswordInfo.rejected, (state) => {
            state.loading = false
            state.errorMessage = 'Failed to update maybe your password incorrect or confirmation does not match with the new password';
        })
    }
  })

  export const { clearMessages } = editPasswordSlice.actions; 
  export default editPasswordSlice.reducer