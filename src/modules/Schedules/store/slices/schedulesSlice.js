import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getSchedules = createAsyncThunk("schedules/getSchedules", async () => {
    const response = await axiosInstance.get('/doctor-schedules')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting schedules");  
      } 
  });

const initialState = {  
    schedules: [], 
    loading: false,  
    error: null,
  }

  const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getSchedules.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getSchedules.fulfilled, (state, action) => {
            state.loading = false
            state.schedules = action.payload
            state.error = null
        })
        builder.addCase(getSchedules.rejected, (state, action) => {
            state.loading = false
            state.schedules = []
            state.error = action.error.message
          })
    }
  })

  export default schedulesSlice.reducer