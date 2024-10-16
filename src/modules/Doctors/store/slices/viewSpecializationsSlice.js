import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getSpecializations = createAsyncThunk("specializations/getSpecializations", async () => {
    const response = await axiosInstance.get('/specializations')
    if (response.status === 200) { 
        console.log(response) 
        return response.data; 
      } else {  
        throw new Error("Failed getting account information");  
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
        builder.addCase(getSpecializations.fulfilled, (state, action) => {
            console.log(action.payload)
            //state.accountInfo = action.payload
        })
    }

  })

  export default specializationsSlice.reducer