import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice from './slices/authSlice'
import accountSlice from '../modules/Account/store/slices/accountSlice'
import addDepartmentSlice from '../modules/Departments/store/slices/AddDepartmentSlice'
import viewSpecializationsSlice from '../modules/Specializations/store/slices/viewSpecializationsSlice'
import viewDepartmentsSlice from '../modules/Departments/store/slices/viewDepartmentsSlice'
import editPasswordSlice from '../modules/Account/store/slices/editPasswordSlice'
import addRoomSlice from '../modules/Rooms/store/slices/addRoomSlice'
import viewRoomsSlice from '../modules/Rooms/store/slices/viewRoomsSlice'
import editDepartmentSlice from '../modules/Departments/store/slices/editDepartmentSlice'
import editRoomSlice from '../modules/Rooms/store/slices/editRoomSlice'
import addSpecializationSlice from '../modules/Specializations/store/slices/addSpecializationSlice'
import editSpecializationSlice from '../modules/Specializations/store/slices/editSpecializationSlice'
import deleteSpecializationSlice from '../modules/Specializations/store/slices/deleteSpecializationSlice'
import deleteRoomSlice from '../modules/Rooms/store/slices/deleteRoomSlice'
import deleteDepartmentSlice from "../modules/Departments/store/slices/deleteDepartmentSlice"
import viewDoctorsSlice from "../modules/Doctors/store/slices/viewDoctorsSlice"
import addDoctorSlice from '../modules/Doctors/store/slices/addDoctorSlice'
import editDoctorSlice from "../modules/Doctors/store/slices/editDoctorSlice"
import deleteDoctorSlice from "../modules/Doctors/store/slices/deleteDoctorSlice"
import schedulesSlice from '../modules/Schedules/store/slices/schedulesSlice'
import addScheduleSlice from '../modules/Schedules/store/slices/addScheduleSlice'
import editScheduleSlice from '../modules/Schedules/store/slices/editScheduleSlice'
import deleteSchedualeSlice from '../modules/Schedules/store/slices/deleteScheduleSlice'
import patientsSlice from '../modules/Patients/store/slices/patientsSlice'
import addPatientSlice from '../modules/Patients/store/slices/addPatientSlice'
import editPatientSlice from '../modules/Patients/store/slices/editPatientSlice'
import deletePatientSlice from '../modules/Patients/store/slices/deletePatientSlice'
import servicesSlice from '../modules/Services/store/slices/servicesSlice'
import addServiceSlice from '../modules/Services/store/slices/addServiceSlice'
import editServiceSlice from '../modules/Services/store/slices/editServiceSlice'
import deleteServiceSlice from '../modules/Services/store/slices/deleteServiceSlice'

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
      viewDoctors: viewDoctorsSlice,
      addDoctor: addDoctorSlice,
      editDoctor: editDoctorSlice,
      deleteDoctor: deleteDoctorSlice,
      schedules: schedulesSlice,
      addSchedule: addScheduleSlice,
      editSchedule: editScheduleSlice,
      deleteSchedule: deleteSchedualeSlice,
      patients: patientsSlice,
      addPatient: addPatientSlice,
      editPatient: editPatientSlice,
      deletePatient: deletePatientSlice,
      services: servicesSlice,
      addService: addServiceSlice,
      editService: editServiceSlice,
      deleteService: deleteServiceSlice,
    },
  };

const store = configureStore(reducers);

export default store;