import { createSlice } from "@reduxjs/toolkit";

const sidebarReducer = createSlice({
    name: 'sidebar',
    initialState: {
        isCollapsed: false
    },
    reducers: {
        setIsCollapsed(state, action) {
            state.isCollapsed = action.payload
        }
    }
})

export const { setIsCollapsed} = sidebarReducer.actions;
export default sidebarReducer.reducer; 