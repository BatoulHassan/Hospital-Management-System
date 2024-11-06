import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateVisit = createAsyncThunk("editVisit/updateVisit", async (data) => {
    console.log(data)
    const response = await axiosInstance.put(`/patient-visits/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating visit");  
      } 
  })

const initialState = {  
    visit: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editVisitSlice = createSlice({
    name: 'editVisit',
    initialState,
    reducers:{
        clearEdittingVisitMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(updateVisit.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateVisit.fulfilled, (state, action) => {
            state.loading = false
            state.visit = action.payload
            state.message = 'Visit updated successfully!'
        })
        builder.addCase(updateVisit.rejected, (state) => {
            state.loading = false
            state.schedule = null
            state.error = 'Failed to edit visit';
            state.message = ''
         })
    }
  })

  export const {clearEdittingVisitMsg} = editVisitSlice.actions
  export default editVisitSlice.reducer