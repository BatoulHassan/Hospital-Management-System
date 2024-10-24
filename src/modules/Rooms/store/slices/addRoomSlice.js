import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewRoom = createAsyncThunk("addRoom/addNewDepartment", async (data) => {
    const response = await axiosInstance.post('/rooms', data)
    if (response.status === 201) {  
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
    reducers:{
        clearMessage:(state) => {
            state.message = ''
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewRoom.pending, (state) => {
            state.loadingAdd = true
        })
        builder.addCase(addNewRoom.fulfilled, (state, action) => {
            state.loadingAdd = false
            state.room = action.payload
            state.message = 'Room added successfully!'
        })
        builder.addCase(addNewRoom.rejected, (state) => {
            state.loadingAdd = false
            state.room = null
            state.error = 'Failed to add room'
            state.message = ''
        })
    }
})

export const {clearMessage} = addRoomSlice.actions
export default addRoomSlice.reducer