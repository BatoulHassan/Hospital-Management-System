import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewVisit = createAsyncThunk("addVisit/addNewVisit", async (data) => {
    const response = await axiosInstance.post('/patient-visits', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new visit");  
      } 
  });

const initialState= {  
    visit: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const addVisitSlice = createSlice({
    name: 'addVisit',
    initialState,
    reducers:{
        clearAddingVisitMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewVisit.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewVisit.fulfilled, (state, action) => {
            state.loading = false
            state.visit = action.payload
            state.message = 'Visit added successfully'
        })
        builder.addCase(addNewVisit.rejected, (state) => {
            state.loading = false
            state.specialization = null
            state.error = 'Failed to add visit'
            state.message = ''
        })
    }
  })

  export const {clearAddingVisitMsg} = addVisitSlice.actions
  export default addVisitSlice.reducer