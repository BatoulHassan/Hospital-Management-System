import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../../utils/axios.jsx'

export const updateSpecialization = createAsyncThunk("editSpecialization/updateSpecialization", async (data) => {
    const response = await axiosInstance.put(`/specializations/${data.id}`, data)
    if (response.status === 200) {  
        return response.data; 
      } else {  
        throw new Error("Failed updating specialization");  
      } 
  });

  const initialState= {  
    specialization: null, 
    loading: false,  
    error: null,
    message: '' 
  }

  const editSpecializationSlice = createSlice({
    name: 'editSpecialization',
    initialState,
    reducers:{
        clearEdittingSpecailMsg:(state) => {
            state.message = ''
            state.error = null
          }
    },
    extraReducers:(builder) => {
        builder.addCase(updateSpecialization.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(updateSpecialization.fulfilled, (state, action) => {
              state.loading = false
              state.specialization = action.payload
              state.message = 'specialization updated successfully!'
        })
        builder.addCase(updateSpecialization.rejected, (state, action) => {
              state.loading = false
              state.specialization = null
              state.error = action.error.message;
              state.message = ''
          })
    }
  })

  export const {clearEdittingSpecailMsg} = editSpecializationSlice.actions
  export default editSpecializationSlice.reducer