import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateDoctor = createAsyncThunk("editDoctor/updateDoctor", async (id,data) => {
    console.log(id)
    const response = await axiosInstance.put(`/doctors/${id}`, data)
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
        builder.addCase(updateDoctor.rejected, (state, action) => {
           state.loading = false
           state.doctor = null
           state.error = action.error.message;
           state.message = ''
        })
    }
  })

  export const {clearEdittingDoctorMsg} = editDoctorSlice.actions
  export default editDoctorSlice.reducer