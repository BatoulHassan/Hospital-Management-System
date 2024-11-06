import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getMedicalConditions = createAsyncThunk("medicalConditions/getMedicalConditions", async () => {
    const response = await axiosInstance.get('/medical-conditions')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting medical conditions");  
      } 
  })

const initialState = {  
    medicalConditions: [], 
    loading: false,  
    error: null,
}

  const medicalConditionsSlice = createSlice({
    name: 'medicalConditions',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getMedicalConditions.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getMedicalConditions.fulfilled, (state, action) => {
            state.loading = false
            state.medicalConditions = action.payload
            state.error = null
        })
        builder.addCase(getMedicalConditions.rejected, (state) => {
            state.loading = false
            state.medicalConditions = []
            state.error = 'Failed to get medical conditions'
        })
    }
  })

  export default medicalConditionsSlice.reducer