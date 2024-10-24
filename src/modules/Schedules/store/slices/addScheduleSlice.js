import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewSchedule = createAsyncThunk("addSchedule/addNewSchedule", async (data) => {
    // console.log(data)
       const response = await axiosInstance.post('/doctor-schedules', data)
       if (response.status === 201) {  
           return response.data; 
         } else {  
           throw new Error("Failed adding new schedule");  
         } 
     });

const initialState = {  
    schedule: null, 
    loading: false,  
    error: null,
    message: ''
  }

  const addScheduleSlice = createSlice({
    name: 'addSchedule',
    initialState,
    reducers:{
        clearAddingScheduleMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewSchedule.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewSchedule.fulfilled, (state, action) => {
            state.loading = false
            state.schedule = action.payload
            state.message = 'Schedule added successfully'
        })
        builder.addCase(addNewSchedule.rejected, (state) => {
            state.loading = false
            state.schedule = null
            state.error = 'Failed to add schedule'
            state.message = ''
        })
    }
  })

  export const {clearAddingScheduleMsg} = addScheduleSlice.actions
  export default addScheduleSlice.reducer