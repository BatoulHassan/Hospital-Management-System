import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateDepartment = createAsyncThunk("editDepartment/updateDepartment", async (data) => {
    const response = await axiosInstance.put(`/departments/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating  department");  
      } 
  });

const initialState= { 
    loading: false, 
    department: null,   
    error: null,
    message: ''
  }

const editDepartmentSlice = createSlice({
    name: 'editDepartment',
    initialState,
    reducers: {
      clearEditDepartmentMessage:(state) => {
        state.message = ''
        state.error = null
      }
    },
    extraReducers: (builder) => {
        builder.addCase(updateDepartment.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateDepartment.fulfilled, (state, action) => {
            state.loading = false
            state.department = action.payload
            state.error = null
            state.message = 'Department updated successfully!'
        })
        builder.addCase(updateDepartment.rejected, (state) => {
            state.loading = false
            state.department = null
            state.error = 'Failed to edit department'
            state.message = ''
        })
    }
})

export const {clearEditDepartmentMessage} = editDepartmentSlice.actions
export default editDepartmentSlice.reducer