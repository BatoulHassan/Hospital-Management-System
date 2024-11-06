import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateService = createAsyncThunk("editService/updateService", async (data) => {
    const response = await axiosInstance.put(`/services/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating service");  
      } 
  })

const initialState = {  
    service: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editServiceSlice = createSlice({
    name: 'editService',
    initialState,
    reducers:{
        clearEdittingServiceMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(updateService.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.loading = false
            state.service = action.payload
            state.message = 'Service updated successfully!'
        })
        builder.addCase(updateService.rejected, (state) => {
            state.loading = false
            state.schedule = null
            state.error = 'Failed to edit service';
            state.message = ''
         })
    }
  })

  export const {clearEdittingServiceMsg} = editServiceSlice.actions
  export default editServiceSlice.reducer