import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewPatient = createAsyncThunk("addPatient/addNewPatient", async (data) => {
    const response = await axiosInstance.post('/patients', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new patient");  
      } 
  });

const initialState = {  
    patient: null, 
    loading: false,  
    error: null,
    message: ''
  }

  const addPatientSlice = createSlice({
    name: 'addPatient',
    initialState,
    reducers:{
        clearAddingPatientMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewPatient.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewPatient.fulfilled, (state, action) => {
            state.loading = false
            state.patient = action.payload
            state.message = 'Patient added successfully'
        })
        builder.addCase(addNewPatient.rejected, (state) => {
            state.loading = false
            state.patient = null
            state.error = 'Failed addedd patient!'
            state.message = ''
        })
    }
  })

  export const {clearAddingPatientMsg} = addPatientSlice.actions
  export default addPatientSlice.reducer