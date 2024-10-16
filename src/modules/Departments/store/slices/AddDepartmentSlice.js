import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewDepartment = createAsyncThunk("addDepartment/addNewDepartment", async (data) => {
    
    const response = await axiosInstance.post('/departments', data)
    if (response.status === 200) {  
        console.log(response)
        return response.data; 
      } else {  
        throw new Error("Failed adding new department");  
      } 
  });

const initialState= {  
    department: null,  
    loading: false,  
    error: null,  
  }

  const addDepartmentSlice = createSlice({
    name: 'addDepartment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewDepartment.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewDepartment.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.department = action.payload
        })
        builder.addCase(addNewDepartment.rejected, (state, action) => {
          state.loading = false
          state.department = null
          state.error = action.error.message;
      })
    }
})

export default addDepartmentSlice.reducer