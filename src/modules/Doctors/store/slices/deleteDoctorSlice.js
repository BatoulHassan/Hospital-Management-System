import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteDoctorItem = createAsyncThunk("deleteDoctor/deleteDoctorItem", async (id) => {
    const response = await axiosInstance.delete(`/doctors/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting doctor!");  
      } 
  });

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteDoctorSlice = createSlice({
    name: 'deleteDoctor',
    initialState,
    reducers:{
      clearDeleteDoctorMsg: (state) => {
        state.error = ''
        state.message = ''
      }
    },
    extraReducers:(builder) => {
        builder.addCase(deleteDoctorItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteDoctorItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Doctor deleted successfully!"
            state.error = null
        })
        builder.addCase(deleteDoctorItem.rejected, (state) => {
            state.loading = false
            state.message = ""
            state.error = 'Failed to delete Docotr'
        })
    }
  })

  export const {clearDeleteDoctorMsg} = deleteDoctorSlice.actions
  export default deleteDoctorSlice.reducer