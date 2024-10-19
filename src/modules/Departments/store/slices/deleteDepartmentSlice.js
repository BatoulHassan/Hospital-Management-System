import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteDepartmentItem = createAsyncThunk("deleteDepartment/deleteDepartmentItem", async (id) => {
    const response = await axiosInstance.delete(`/departments/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting Department");  
      } 
  });

const initialState = {  
    loading: false,  
    error: null,  
    status: ""
  }

  const deleteDepartmentSlice = createSlice({
    name: 'deleteDepartment',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(deleteDepartmentItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteDepartmentItem.fulfilled, (state) => {
            state.loading = false
            state.error = null
            state.status = "successed"
        }),
        builder.addCase(deleteDepartmentItem.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message
            state.status = "failed"
        })
    }
  })

  export default deleteDepartmentSlice.reducer