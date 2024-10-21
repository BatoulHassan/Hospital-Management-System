import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteSpecializationItem = createAsyncThunk("deleteSpecialization/deleteSpecializationItem", async (id) => {
    const response = await axiosInstance.delete(`/specializations/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting specialization!");  
      } 
  });

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteSpecializationSlice = createSlice({
    name: 'deleteSpecialization',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(deleteSpecializationItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteSpecializationItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Specialization deleted successfully!"
            state.error = null
        })
        builder.addCase(deleteSpecializationItem.rejected, (state,action) => {
            state.loading = false
            state.message = ""
            state.error = action.error.message
        })
    }
  })

  export default deleteSpecializationSlice