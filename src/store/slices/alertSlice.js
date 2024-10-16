import { createSlice } from "@reduxjs/toolkit";

const alertReducer = createSlice({
    name: "alert",
    initialState: { 
        open: false,
        },
    reducers: {
        showAlert: (state) => {
            state.open = true
        },
        hideAlert: (state) => {
            state.open = false
        }
    }
})

export const { showAlert, hideAlert } = alertReducer.actions;  
export default alertReducer.reducer;  