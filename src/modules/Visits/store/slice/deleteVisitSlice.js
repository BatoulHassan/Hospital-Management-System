import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteVisitItem = createAsyncThunk("deleteVisit/deleteVisitItem", async (id) => {
    const response = await axiosInstance.delete(`/patient-visits/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting visit!");  
      } 
  })

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteVisitSlice = createSlice({
    name: 'deleteVisit',
    initialState,
    reducers:{
        clearDeleteVisitMsg: (state) => {
          state.error = ''
          state.message = ''
        }
      },
    extraReducers:(builder) => {
        builder.addCase(deleteVisitItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteVisitItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Visit deleted successfully!"
            state.error = null
        })
        builder.addCase(deleteVisitItem.rejected, (state) => {
            state.loading = false
            state.message = ""
            state.error = 'Failed to delete'
        })
    }
  })

  export const {clearDeleteVisitMsg} = deleteVisitSlice.actions
  export default deleteVisitSlice.reducer