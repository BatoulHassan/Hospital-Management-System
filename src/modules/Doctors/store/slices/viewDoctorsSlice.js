import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getDoctors = createAsyncThunk("viewDoctors/getDoctors", async () => {
    const response = await axiosInstance.get('/doctors')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting doctors");  
      } 
  });

const initialState= {  
    doctors: [], 
    loading: false,  
    error: null,
  }

  const viewDoctorsSlice = createSlice({
    name: "viewDoctors",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDoctors.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getDoctors.fulfilled, (state, action) => {
            state.loading = false
            state.doctors = action.payload
            state.error = null
        })
        builder.addCase(getDoctors.rejected, (state, action) => {
            state.loading = false
            state.doctors = []
            state.error = action.error.message
          })
    }
  })

  export default viewDoctorsSlice.reducer