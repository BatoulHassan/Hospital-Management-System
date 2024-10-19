import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewDepartment = createAsyncThunk("addDepartment/addNewDepartment", async (data) => {
    const response = await axiosInstance.post('/departments', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new department");  
      } 
  });

const initialState= {  
    department: null,  
    loading: false,  
    error: null,
    message: '' 
  }

  const addDepartmentSlice = createSlice({
    name: 'addDepartment',
    initialState,
    reducers: {
      clearAddingMessage:(state) => {
        state.message = ''
        state.error = null
      }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewDepartment.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewDepartment.fulfilled, (state, action) => {
            state.loading = false
            state.department = action.payload
            state.message = 'Department added successfully'
        })
        builder.addCase(addNewDepartment.rejected, (state, action) => {
          state.loading = false
          state.department = null
          state.error = action.error.message
          state.message = ''
      })
    }
})

export const {clearAddingMessage} = addDepartmentSlice.actions
export default addDepartmentSlice.reducer