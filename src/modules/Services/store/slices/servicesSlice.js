import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getServices = createAsyncThunk("services/getServices", async () => {
    const response = await axiosInstance.get('/services')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting services");  
      } 
  });

const initialState = {  
    services: [], 
    loading: false,  
    error: null,
  }

  const servicesSlice = createSlice({
    name: 'services',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getServices.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.loading = false
            state.services = action.payload
            state.error = null
        })
        builder.addCase(getServices.rejected, (state) => {
            state.loading = false
            state.services = []
            state.error = 'Failed to fetch services'
          })
    }
  })

  export default servicesSlice.reducer