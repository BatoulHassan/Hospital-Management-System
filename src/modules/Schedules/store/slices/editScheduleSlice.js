import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateSchedule = createAsyncThunk("editSchedule/updateSchedule", async (data) => {
    console.log(data)
    const response = await axiosInstance.put(`/doctor-schedules/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating schedule");  
      } 
  })

const initialState = {  
    schedule: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editScheduleSlice = createSlice({
    name: 'editSchedule',
    initialState,
    reducers:{
        clearEdittingScheduleMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(updateSchedule.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateSchedule.fulfilled, (state, action) => {
            state.loading = false
            state.schedule = action.payload
            state.message = 'Schedule updated successfully!'
        })
        builder.addCase(updateSchedule.rejected, (state) => {
            state.loading = false
            state.schedule = null
            state.error = 'Failed to edit schedule';
            state.message = ''
         })
    }
  })

  export const {clearEdittingScheduleMsg} = editScheduleSlice.actions
  export default editScheduleSlice.reducer