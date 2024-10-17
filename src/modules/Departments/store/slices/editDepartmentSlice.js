import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateDepartment = createAsyncThunk("editDepartment/updateDepartment", async (data) => {
    const response = await axiosInstance.put(`/departments/${data.id}`, data)
    if (response.status === 200) {  
        console.log(response)
        return response.data; 
      } else {  
        throw new Error("Failed adding new department");  
      } 
  });

const initialState= {  
    department: null,   
    error: null,
    message: ''
  }

const editDepartmentSlice = createSlice({
    name: 'editDepartment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateDepartment.fulfilled, (state, action) => {
            state.department = action.payload
            state.error = null
            state.message = 'Department updated successfully!'
        })
        builder.addCase(updateDepartment.rejected, (state, action) => {
            state.department = null
            state.error = action.error.message
            state.message = ''
        })
    }
})

export default editDepartmentSlice.reducer