import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewRoom = createAsyncThunk("addRoom/addNewDepartment", async (data) => {
    //console.log(data)
    const response = await axiosInstance.post('/rooms', data)
    if (response.status === 201) {  
        //console.log(response)
        return response.data; 
      } else {  
        throw new Error("Failed adding new room");  
      } 
  });

const initialState= {  
    room: null,  
    loadingAdd: false,
    message: '',
    error: null,  
  }

const addRoomSlice = createSlice({
    name: 'addRoom',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewRoom.pending, (state) => {
            state.loadingAdd = true
        }),
        builder.addCase(addNewRoom.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loadingAdd = false
            state.room = action.payload
            state.message = 'Room added successfully!'
        })
        builder.addCase(addNewRoom.rejected, (state, action) => {
            state.loadingAdd = false
            state.room = null
            state.error = action.error.message;
            state.message = ''
        })
    }
})

export default addRoomSlice.reducer