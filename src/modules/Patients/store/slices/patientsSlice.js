import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getPatients = createAsyncThunk("patientsSlice/getPatients", async () => {
    const response = await axiosInstance.get('/patients')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting patients");  
      } 
  });

const initialState= {  
    patients: [], 
    loading: false,  
    error: null,
  }

  const patientsSlice = createSlice({
    name: 'viewPatients',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getPatients.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getPatients.fulfilled, (state, action) => {
            state.loading = false
            state.patients = action.payload
            state.error = null
        })
        builder.addCase(getPatients.rejected, (state, action) => {
            state.loading = false
            state.patients = []
            state.error = action.error.message
          })
    }
  })

  export default patientsSlice.reducer