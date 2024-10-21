import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteScheduleItem = createAsyncThunk("deleteSchedule/deleteScheduleItem", async (id) => {
    const response = await axiosInstance.delete(`/doctor-schedules/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting schedule!");  
      } 
  })

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteScheduleSlice = createSlice({
    name: 'deleteSchedule',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteScheduleItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteScheduleItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Schedule deleted successfully!"
            state.error = null
        })
        builder.addCase(deleteScheduleItem.rejected, (state,action) => {
            state.loading = false
            state.message = ""
            state.error = action.error.message
        })
    }
  })

  export default deleteScheduleSlice.reducer