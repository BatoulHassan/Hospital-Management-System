import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateDoctor = createAsyncThunk("editDoctor/updateDoctor", async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('department_id', data.department_id)
    formData.append('specialization_id', data.specialization_id)
    formData.append('avatar', data.avatar)
    formData.append('_method', 'PUT')
    console.log("formData is: ", formData)
    
    const response = await axiosInstance.post(`/doctors/${data.id}`, formData)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating doctor");  
      } 
  })

const initialState = {  
    doctor: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editDoctorSlice = createSlice({
    name: 'editDoctor',
    initialState,
    reducers:{
        clearEdittingDoctorMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(updateDoctor.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.doctor = action.payload
            state.message = 'Doctor updated successfully!'
        })
        builder.addCase(updateDoctor.rejected, (state) => {
           state.loading = false
           state.doctor = null
           state.error = 'Failed to edit doctor'
           state.message = ''
        })
    }
  })

  export const {clearEdittingDoctorMsg} = editDoctorSlice.actions
  export default editDoctorSlice.reducer