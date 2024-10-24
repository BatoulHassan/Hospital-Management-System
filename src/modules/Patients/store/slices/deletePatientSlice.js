import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deletePatientItem = createAsyncThunk("deletePatient/deletePatientItem", async (id) => {
    const response = await axiosInstance.delete(`/patients/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting patient!")
      } 
  });

const initialState = {  
    loading: false,  
    error: null,
    message: ''
  }

  const deletePatientSlice = createSlice({
    name: 'deletePatient',
    initialState,
    reducers:{
      clearPatientMsg: (state) => {
        state.error = ''
        state.message = ''
      }
    },
    extraReducers:(builder) => {
        builder.addCase(deletePatientItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deletePatientItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Patient deleted successfully!"
            state.error = null
        })
        builder.addCase(deletePatientItem.rejected, (state) => {
            state.loading = false
            state.message = ""
            state.error = 'Failed to delete!'
        })
    }
  })

  export const {clearPatientMsg} = deletePatientSlice.actions
  export default deletePatientSlice.reducer