import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/sidebarSlice";

const reducers = {
    reducer: {
      sidebar: sidebarSlice
    },
  };

const store = configureStore(reducers);

export default store;