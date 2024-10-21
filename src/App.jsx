import { Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import Login from './MainPages/Login/Login'
import AdminDashboard from './MainPages/AdminDashboard/AdminDashboard'
import DoctorDashboard from './MainPages/DoctorDashboard/DoctorDashboard'
import PatientDashboard from './MainPages/PatientDashboard/PatientDashboard'
import Dashboard from "./modules/Dashboard/pages/Dashboard"
import Departments from './modules/Departments/pages/Departments'
import AddDepartment from './modules/Departments/pages/AddDepartment'
import EditDepartment from './modules/Departments/pages/EditDepartment'
import Rooms from './modules/Rooms/pages/Rooms'
import { Provider } from "react-redux"
import store from "./store"
import AddRooms from "./modules/Rooms/pages/AddRooms"
import EditRoom from './modules/Rooms/pages/EditRoom'
import AddDoctor from "./modules/Doctors/pages/AddDoctor"
import Doctors from "./modules/Doctors/pages/Doctors"
import Account from "./modules/Account/pages/Account"
import EditAccount from './modules/Account/pages/EditAccount'
import Specializations from "./modules/Specializations/pages/Specializations"
import RoomsOfDepartment from "./modules/Departments/pages/RoomsOfDepartment"
import AddSpecialization from "./modules/Specializations/pages/AddSpecialization"
import EditSpecialization from "./modules/Specializations/pages/EditSpecialization"
import EditDoctor from './modules/Doctors/pages/EditDoctor'
import Schedules from './modules/Schedules/pages/Schedules'
import AddSchedules from "./modules/Schedules/pages/AddSchedules"
import EditSchedule from "./modules/Schedules/pages/EditSchedule"

function App() {
 
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route path='admin' element={<AdminDashboard />}>
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
           <Route path='departments' element={<Departments />} />
           <Route path='addDepartment' element={<AddDepartment />} />
           <Route path='departments/editDepartment/:id' element={<EditDepartment />} />
           <Route path='departments/viewRooms/:id' element={<RoomsOfDepartment />} />
           <Route path='rooms' element={<Rooms />} />
           <Route path='addRoom' element={<AddRooms />} />
           <Route path='rooms/editRoom/:id' element={<EditRoom />} />
           <Route path='doctors' element={<Doctors />} />
           <Route path='addDoctor' element={<AddDoctor />} />
           <Route path="account" element={<Account />} />
           <Route path="editAccount" element={<EditAccount />} />
           <Route path="specializations" element={<Specializations />} />
           <Route path="addSpecialization" element={<AddSpecialization />} />
           <Route path='specializations/editSpecialization/:id' element={<EditSpecialization />} />
           <Route path='doctors/editDoctor/:id' element={<EditDoctor />} />
           <Route path="schedules" element={<Schedules />} />
           <Route path="addSchedules" element={<AddSchedules />} />
           <Route path="schedules/editSchedule/:id" element={<EditSchedule />} />
        </Route>

        <Route path='doctor' element={<DoctorDashboard />} >
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
           <Route path='departments' element={<Departments />} />
           <Route path='addDepartment' element={<AddDepartment />} />
           <Route path='rooms' element={<Rooms />} />
        </Route>

        <Route path='patient' element={<PatientDashboard />} >
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
        </Route>   
      </Routes>
    </Provider>
  )
}

export default App
