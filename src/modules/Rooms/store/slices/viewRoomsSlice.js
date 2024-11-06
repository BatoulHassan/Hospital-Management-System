import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

  export const getRooms = createAsyncThunk(  
    'viewRoom/getRooms',  
    async (_, { rejectWithValue }) => {  
      try {  
        const response = await axiosInstance.get('/rooms');  
        return response.data 
      } catch (error) {    
        if (error.response) {  
          const errorMessage = error.response.data?.message || 'Unknown error occurred';  
          return rejectWithValue(errorMessage);  
        }  
        return rejectWithValue('An error occurred');  
      }  
    }  
  );  

const initialState = {  
    rooms: null,
    roomId: null,
    loading: false,  
    error: null, 
    status: '' 
  }

  const viewRoomsSlice = createSlice({
    name: 'viewRoom',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getRooms.pending, (state) => {
        state.loading = true
      }),
      builder.addCase(getRooms.fulfilled, (state, action) => {
            state.loading = false
            state.rooms = action.payload
            state.error = null
      }),
      builder.addCase(getRooms.rejected, (state, action) => {
           state.loading = false
           state.rooms = null
           state.error = action.payload;
      })
  }
  })

  export default viewRoomsSlice.reducer