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
import addSpecializationSlice from '../modules/Doctors/store/slices/addSpecializationSlice'
import editSpecializationSlice from '../modules/Doctors/store/slices/editSpecializationSlice'
import deleteSpecializationSlice from '../modules/Doctors/store/slices/DeleteSpecializationSlice'
import deleteRoomSlice from '../modules/Rooms/store/slices/deleteRoomSlice'
import deleteDepartmentSlice from "../modules/Departments/store/slices/deleteDepartmentSlice"

const reducers = {
    reducer: {
      sidebar: sidebarSlice,
      auth: authSlice,
      account: accountSlice,
      editPassword: editPasswordSlice ,
      viewDepartments: viewDepartmentsSlice,
      addDepartment: addDepartmentSlice,
      editDepartment: editDepartmentSlice,
      deleteDepartment: deleteDepartmentSlice,
      viewRooms: viewRoomsSlice,
      addRoom: addRoomSlice,
      editRoom: editRoomSlice,
      deleteRoom: deleteRoomSlice,
      specializations: viewSpecializationsSlice,
      addSpecialization: addSpecializationSlice,
      editSpecialization: editSpecializationSlice,
      deleteSpecialization: deleteSpecializationSlice,
      
    },
  };

const store = configureStore(reducers);

export default store;