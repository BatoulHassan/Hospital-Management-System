import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice from './slices/authSlice'
import accountSlice from '../modules/Account/store/slices/accountSlice'
import addDepartmentSlice from '../modules/Departments/store/slices/AddDepartmentSlice'
import viewSpecializationsSlice from '../modules/Doctors/store/slices/viewSpecializationsSlice'
import viewDepartmentsSlice from '../modules/Departments/store/slices/viewDepartmentsSlice'
import editPasswordSlice from '../modules/Account/store/slices/editPasswordSlice'
import addRoomSlice from '../modules/Rooms/store/slices/addRoomSlice'
import viewRoomsSlice from '../modules/Rooms/store/slices/viewRoomsSlice'
import editDepartmentSlice from '../modules/Departments/store/slices/editDepartmentSlice'
import editRoomSlice from '../modules/Rooms/store/slices/editRoomSlice'

const reducers = {
    reducer: {
      sidebar: sidebarSlice,
      auth: authSlice,
      account: accountSlice,
      editPassword: editPasswordSlice ,
      viewDepartments: viewDepartmentsSlice,
      addDepartment: addDepartmentSlice,
      editDepartment: editDepartmentSlice,
      viewRooms: viewRoomsSlice,
      addRoom: addRoomSlice,
      editRoom: editRoomSlice,
      specializations: viewSpecializationsSlice
    },
  };

const store = configureStore(reducers);

export default store;