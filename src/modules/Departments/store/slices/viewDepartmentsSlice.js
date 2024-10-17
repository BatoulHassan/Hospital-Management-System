import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getDepartments = createAsyncThunk("viewDepartments/getDepartments", async () => {
    const response = await axiosInstance.get('/departments')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting Departments");  
      } 
  });

  export const deleteDepartment = createAsyncThunk("viewDepartments/deleteDepartment", async (id) => {
    const response = await axiosInstance.delete(`/departments/${id}`)
    console.log(response)
    if (response.status === 204) { 
        return response
      } else {  
        throw new Error("Failed deleting Department");  
      } 
  });

  
const initialState = {  
    departments: [], 
    loading: false,  
    error: null,  
  }

  const viewDepartmentsSlice = createSlice({
    name: 'viewDepartments',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDepartments.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getDepartments.fulfilled, (state, action) => {
            state.loading = false
            state.departments = action.payload
            state.error = null
        })
        builder.addCase(getDepartments.rejected, (state, action) => {
            state.loading = false
            state.departments = []
            state.error = action.error.message;
        })
        builder.addCase(deleteDepartment.fulfilled, (state, action) => {
          console.log(action.payload)
          state.status = 'succeeded'
      })
        
    }
  })

  export default viewDepartmentsSlice.reducer