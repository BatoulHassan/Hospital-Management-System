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
    status: '' 
  }

  const deleteRoomSlice = createSlice({
    name: "deleteRoom",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteRoomItem.pending, (state) => {
            state.loading = true
          }),
          builder.addCase(deleteRoomItem.fulfilled, (state) => {
            state.loading = false,
            state.status = 'successed'
            state.error = null
          }),
          builder.addCase(deleteRoomItem.rejected, (state,action) => {
            state.loading = false,
            state.status = 'failed'
            state.error = action.error.message
          })
    }
  })

  export default deleteRoomSlice.reducer