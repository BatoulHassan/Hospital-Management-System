import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteDepartment = createAsyncThunk("deleteDepartment/deleteDepartment", async (id) => {
    const response = await axiosInstance.delete(`/departments/${id}`)
    if (response.status === 204) { 
        return 
      } else {  
        throw new Error("Failed getting Departments");  
      } 
  });

const initialState = {  
    status: '',  
    error: null,  
  }

  const deleteDepartmentSlice = createSlice({
    name: 'deleteDepartment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteDepartment.pending, (state) => {  
            state.status = 'loading';  
          })  
        builder.addCase(deleteDepartment.fulfilled, (state) => {
            state.status = 'succeeded'
        })
        builder.addCase(deleteDepartment.rejected, (state, action) => {  
            state.status = 'failed';  
            state.error = action.error.message;  
          }); 
    }
  })

  export default deleteDepartmentSlice.reducer