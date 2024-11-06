import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateMedicalCondition = createAsyncThunk("editMedical/updateMedicalCondition", async (data) => {
    const response = await axiosInstance.put(`/medical-conditions/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed editting medical condition");  
      } 
  });

const initialState = {
    loading: false,  
    medicalCondition: null,   
    error: null,
    message: ''
  }

  const editMedicalSlice = createSlice({
    name: 'editMedical',
    initialState,
    reducers: {
        clearEdittingMedicalMsg:(state) => {
          state.message = ''
          state.error = null
        }
      },
    extraReducers:(builder) => {
        builder.addCase(updateMedicalCondition.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateMedicalCondition.fulfilled, (state, action) => {
            state.loading = false
            state.medicalCondition = action.payload
            state.message = 'Medical condition updated successfully!'
        }),
        builder.addCase(updateMedicalCondition.rejected, (state) => {
            state.loading = false
            state.medicalCondition = null
            state.error = 'Failed to edit Medical condition'
            state.message = ''
        })
    }
  })

  export const {clearEdittingMedicalMsg} = editMedicalSlice.actions
  export default editMedicalSlice.reducer