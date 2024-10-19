import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const addNewSpecialization = createAsyncThunk("addSpecialization/addNewSpecialization", async (data) => {
    const response = await axiosInstance.post('/specializations', data)
    if (response.status === 201) {  
        return response.data; 
      } else {  
        throw new Error("Failed adding new specialization");  
      } 
  });

const initialState= {  
    specialization: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const addSpecializationSlice = createSlice({
    name: 'addSpecialization',
    initialState,
    reducers:{
        clearAddingSpecializeMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers: (builder) => {
        builder.addCase(addNewSpecialization.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addNewSpecialization.fulfilled, (state, action) => {
            state.loading = false
            state.specialization = action.payload
            state.message = 'specialization added successfully'
        })
        builder.addCase(addNewSpecialization.rejected, (state, action) => {
            state.loading = false
            state.specialization = null
            state.error = action.error.message
            state.message = ''
        })
    }
  })

  export const {clearAddingSpecializeMsg} = addSpecializationSlice.actions
  export default addSpecializationSlice.reducer