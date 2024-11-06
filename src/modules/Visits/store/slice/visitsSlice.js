import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getVisits = createAsyncThunk("visits/getVisits", async () => {
    const response = await axiosInstance.get('/patient-visits')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting visits");  
      } 
  })

const initialState= {  
    visits: null, 
    loading: false,  
    error: null,
  }

  const visitsSlice = createSlice({
    name: 'visits',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getVisits.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getVisits.fulfilled, (state, action) => {
            state.loading = false
            state.visits = action.payload
            state.error = null
        })
        builder.addCase(getVisits.rejected, (state, action) => {
            state.loading = false
            state.visits = null
            state.error = action.error.message
          })
    }
  })

  export default visitsSlice.reducer