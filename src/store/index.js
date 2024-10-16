import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice from './slices/authSlice'
import accountSlice from '../modules/Account/store/slices/accountSlice'
import addDepartmentSlice from '../modules/Departments/store/slices/AddDepartmentSlice'
import viewSpecializationsSlice from '../modules/Doctors/store/slices/viewSpecializationsSlice'
import viewDepartmentsSlice from '../modules/Departments/store/slices/viewDepartmentsSlice'
import editPasswordSlice from '../modules/Account/store/slices/editPasswordSlice'
import alertSlice from './slices/alertSlice'

const reducers = {
    reducer: {
      sidebar: sidebarSlice,
      auth: authSlice,
      account: accountSlice,
      editPassword: editPasswordSlice ,
      alert: alertSlice ,
      ViewDepartments: viewDepartmentsSlice,
      addDepartment: addDepartmentSlice,
      specializations: viewSpecializationsSlice
    },
  };

const store = configureStore(reducers);

export default store;