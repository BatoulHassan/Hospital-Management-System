import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const deleteRoomItem = createAsyncThunk("deleteRoom/deleteRoomItem", async (id) => {
    const response = await axiosInstance.delete(`/rooms/${id}`)
    if (response.status === 204) { 
        return response.data
      } else {  
        throw new Error("Failed deleting room");  
      } 
  });

const initialState = {  
    loadingDelete: false,  
    error: null, 
    message: '' 
  }

  const deleteRoomSlice = createSlice({
    name: "deleteRoom",
    initialState,
    reducers:{
      clearDeleteRoomMsg: (state) => {
        state.error = ''
        state.message = ''
      }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteRoomItem.pending, (state) => {
            state.loading = true
          }),
          builder.addCase(deleteRoomItem.fulfilled, (state) => {
            state.loading = false,
            state.message = 'Deleted successfully!'
            state.error = null
          }),
          builder.addCase(deleteRoomItem.rejected, (state) => {
            state.loading = false,
            state.message = ''
            state.error = 'Failed to delete room'
          })
    }
  })

  export const {clearDeleteRoomMsg} = deleteRoomSlice.actions
  export default deleteRoomSlice.reducer