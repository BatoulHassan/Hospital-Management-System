import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteServiceItem = createAsyncThunk("deleteService/deleteServiceItem", async (id) => {
    const response = await axiosInstance.delete(`/services/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting service!");  
      } 
  })

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteServiceSlice = createSlice({
    name: 'deleteService',
    initialState,
    reducers:{
        clearServiceMsg: (state) => {
          state.error = ''
          state.message = ''
        }
      },
      extraReducers:(builder) => {
        builder.addCase(deleteServiceItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteServiceItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Service deleted successfully!"
            state.error = null
        })
        builder.addCase(deleteServiceItem.rejected, (state) => {
            state.loading = false
            state.message = ""
            state.error = 'Failed to delete'
        })
      }
  })

  export const {clearServiceMsg} = deleteServiceSlice.actions
  export default deleteServiceSlice.reducer