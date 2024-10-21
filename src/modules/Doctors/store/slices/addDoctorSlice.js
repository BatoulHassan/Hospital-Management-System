import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewDoctor = createAsyncThunk("addDoctor/addNewDoctor", async (data) => {
    const response = await axiosInstance.post('/doctors', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new doctor");  
      } 
  });

const initialState = {  
    doctor: null, 
    loading: false,  
    error: null,
    message: ''
  }

  const addDoctorSlice = createSlice({
    name: 'addDoctor',
    initialState,
    reducers:{
        clearAddingDoctorMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewDoctor.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.doctor = action.payload
            state.message = 'Doctor added successfully'
        })
        builder.addCase(addNewDoctor.rejected, (state, action) => {
            state.loading = false
            state.doctor = null
            state.error = action.error.message
            state.message = ''
        })
    }
  })

  export const {clearAddingDoctorMsg} = addDoctorSlice.actions
  export default addDoctorSlice.reducer