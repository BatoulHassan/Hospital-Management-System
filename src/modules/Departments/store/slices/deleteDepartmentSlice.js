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
    message: ""
  }

  const deleteDepartmentSlice = createSlice({
    name: 'deleteDepartment',
    initialState,
    reducers:{
      clearDeleteDepartmentMsg: (state) => {
        state.error = ''
        state.message = ''
      }
    },
    extraReducers:(builder) => {
        builder.addCase(deleteDepartmentItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteDepartmentItem.fulfilled, (state) => {
            state.loading = false
            state.error = null
            state.message = "Deleted successfully!"
        }),
        builder.addCase(deleteDepartmentItem.rejected, (state) => {
            state.loading = false
            state.error = 'Failed to delete department'
            state.message = ""
        })
    }
  })

  export const {clearDeleteDepartmentMsg} = deleteDepartmentSlice.actions
  export default deleteDepartmentSlice.reducer