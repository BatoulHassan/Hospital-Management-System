import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteMedicalItem = createAsyncThunk("deleteMedical/deleteMedicalItem", async (id) => {
    const response = await axiosInstance.delete(`/medical-conditions/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting medical condition!");  
      } 
  });

const initialState= {  
    loading: false,  
    error: null,
    message: ''
  }

  const deleteMedicalSlice = createSlice({
    name: "deleteMedical",
    initialState,
    reducers:{
        clearDeleteMedicalMsg: (state) => {
          state.error = ''
          state.message = ''
        }
      },
      extraReducers:(builder) => {
        builder.addCase(deleteMedicalItem.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteMedicalItem.fulfilled, (state) => {
            state.loading = false
            state.message = "Medical condition deleted successfully!"
            state.error = null
        }),
        builder.addCase(deleteMedicalItem.rejected, (state) => {
            state.loading = false
            state.message = ""
            state.error = 'Failed to delete medical condition'
        })
      }
  })

  export const {clearDeleteMedicalMsg} = deleteMedicalSlice.actions
  export default deleteMedicalSlice.reducer