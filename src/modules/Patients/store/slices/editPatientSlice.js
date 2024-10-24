import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updatePatient = createAsyncThunk("editPatient/updatePatient", async (data) => {
  console.log(data)
    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('national_id', data.national_id)
    formData.append('mobile_number', data.mobile_number)
    formData.append('residence_address', data.residence_address)
    formData.append('avatar', data.avatar)
    
    formData.append('_method', 'PUT')
    
    const response = await axiosInstance.post(`/patients/${data.id}`, formData)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating patient");  
      } 
  })

const initialState = {  
    patient: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editPatientSlice = createSlice({
    name: 'editPatient',
    initialState,
    reducers:{
      clearEdittingPatientMsg:(state) => {
          state.message = ''
          state.error = null
        }
    },
    extraReducers:(builder) => {
        builder.addCase(updatePatient.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updatePatient.fulfilled, (state, action) => {
            state.loading = false
            state.patient = action.payload
            state.message = 'Patient updated successfully!'
        })
        builder.addCase(updatePatient.rejected, (state) => {
            state.loading = false
            state.patient = null
            state.error = 'Failed to edit patient!'
            state.message = ''
         })
    }
  })

  export const {clearEdittingPatientMsg} = editPatientSlice.actions
  export default editPatientSlice.reducer