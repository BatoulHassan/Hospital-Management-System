import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getSpecializations = createAsyncThunk("specializations/getSpecializations", async () => {
    const response = await axiosInstance.get('/specializations')
    if (response.status === 200) { 
        return response.data; 
      } else {  
        throw new Error("Failed getting specializations");  
      } 
  });

const initialState= {  
    specializations: null, 
    loading: false,  
    error: null,
  }

  const specializationsSlice = createSlice({
    name: 'specializations',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSpecializations.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getSpecializations.fulfilled, (state, action) => {
            state.loading = false
            state.specializations = action.payload
            state.error = null
        })
        builder.addCase(getSpecializations.rejected, (state, action) => {
          state.loading = false
          state.specializations = null
          state.error = action.error.message
        })
    }

  })

  export default specializationsSlice.reducer