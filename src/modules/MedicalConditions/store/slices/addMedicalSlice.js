import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewMedical = createAsyncThunk("addMediaclCondition/addNewMedical", async (data) => {
    const response = await axiosInstance.post('/medical-conditions', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new medical condition");  
      }
  });

const initialState = {  
    medicalCondition: null, 
    loading: false,  
    error: null,
    message: ''
  }

  const addMedicalSlice = createSlice({
    name: 'addMediaclCondition',
    initialState,
    reducers:{
        clearAddingMedicalMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewMedical.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewMedical.fulfilled, (state, action) => {
            state.loading = false
            state.medicalCondition = action.payload
            state.message = 'Medical condition added successfully'
        })
        builder.addCase(addNewMedical.rejected, (state) => {
            state.loading = false
            state.medicalCondition = null
            state.error = 'Failed to add medical condition'
            state.message = ''
        })
    }
  })

  export const {clearAddingMedicalMsg} = addMedicalSlice.actions
  export default addMedicalSlice.reducer