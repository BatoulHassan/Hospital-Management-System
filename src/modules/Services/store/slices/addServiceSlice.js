import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewService = createAsyncThunk("addService/addNewService", async (data) => {
    // console.log(data)
       const response = await axiosInstance.post('/services', data)
       if (response.status === 201) {  
           return response.data; 
         } else {  
           throw new Error("Failed adding new service");  
         } 
     });

const initialState = {  
    service: null, 
    loading: false,  
    error: null,
    message: ''
  }

  const addServiceSlice = createSlice({
    name: 'addService',
    initialState,
    reducers:{
        clearAddingServiceMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(addNewService.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewService.fulfilled, (state, action) => {
            state.loading = false
            state.service = action.payload
            state.message = 'Service added successfully'
        })
        builder.addCase(addNewService.rejected, (state) => {
            state.loading = false
            state.service = null
            state.error = 'Failed to add service'
            state.message = ''
        })
    }
  })

  export const {clearAddingServiceMsg} = addServiceSlice.actions
  export default addServiceSlice.reducer