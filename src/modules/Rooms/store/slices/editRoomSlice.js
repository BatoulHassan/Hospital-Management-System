import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateRoom = createAsyncThunk("editRoom/updateRoom", async (data) => {
    const response = await axiosInstance.put(`/rooms/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed editting room");  
      } 
  });

  const initialState= {
    loadEditting: false,  
    room: null,   
    error: null,
    message: ''
  }

  const editRoomSlice = createSlice({
    name: 'editRoom',
    initialState,
    reducers: {
      clearEdittingMessage:(state) => {
        state.message = ''
        state.error = null
      }
    },
    extraReducers: (builder) => {
        builder.addCase(updateRoom.pending, (state) => {
            state.loadEditting = true
        }),
        builder.addCase(updateRoom.fulfilled, (state, action) => {
          console.log("Action.payload is: ",action.payload)
            state.loadEditting = false
            state.room = action.payload
            state.message = 'Room updated successfully!'
        })
        builder.addCase(updateRoom.rejected, (state, action) => {
          console.log(action.payload)
            state.loadEditting = false
            state.room = null
            state.error = action.error.message;
            state.message = ''
        })
    }
  })

  export const {clearEdittingMessage} = editRoomSlice.actions
  export default editRoomSlice.reducer