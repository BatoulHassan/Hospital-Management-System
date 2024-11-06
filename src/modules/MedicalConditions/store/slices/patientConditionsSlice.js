import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getPatientConditions = createAsyncThunk("patientConditions/getPatientConditions", async () => {
    const response = await axiosInstance.get('/patient/medical-conditions')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting patient conditions");  
      } 
  })

const initialState = {  
    patientConditions: [], 
    loading: false,  
    error: null,
}

const patientConditionsSlice = createSlice({
    name: "patientConditions",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getPatientConditions.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getPatientConditions.fulfilled, (state, action) => {
            state.loading = false
            state.patientConditions = action.payload
            state.error = null
        })
        builder.addCase(getPatientConditions.rejected, (state) => {
            state.loading = false
            state.patientConditions = []
            state.error = 'Failed to get patient conditions'
        })
    }
})

export default patientConditionsSlice.reducer