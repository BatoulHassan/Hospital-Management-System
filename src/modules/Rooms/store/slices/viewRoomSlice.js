import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const getRooms = createAsyncThunk("viewRoom/getRooms", async () => {
    const response = await axiosInstance.get('/rooms')
    if (response.status === 200) { 
        console.log(response) 
        return response.data; 
      } else {  
        throw new Error("Failed getting account information");  
      } 
  });

const initialState = {  
    rooms: null, 
    loading: false,  
    error: null,  
  }

  const viewRoomsSlice = createSlice({
    name: 'viewRoom',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getRooms.fulfilled, (state, action) => {
            console.log(action.payload)
            //state.accountInfo = action.payload
        })
    }
  })

  export default viewRoomsSlice.reducer