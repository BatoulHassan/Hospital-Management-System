import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateDoctor = createAsyncThunk("editDoctor/updateDoctor", async (values) => {
  console.log(values)
  const formData = new FormData()
  formData.append('id', values.id)
  formData.append('name', values.name)
  formData.append('email', values.email)
  formData.append('department_id', values.department_id)
  formData.append('specialization_id', values.specialization_id)
  if (values.avatar){
    formData.append('avatar', values.avatar)
  }
    
    const response = await axiosInstance.post(`/doctors/${values.id}`, formData)
    if (response.status === 200) {  
      console.log('response is: ',response)
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
            console.log(action.payload)
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