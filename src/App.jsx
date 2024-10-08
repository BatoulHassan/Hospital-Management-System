import { Routes, Route, Navigate } from "react-router-dom"
import Login from './MainPages/Login/Login'
import AdminDashboard from './MainPages/AdminDashboard/AdminDashboard'
import DoctorDashboard from './MainPages/DoctorDashboard/DoctorDashboard'
import PatientDashboard from './MainPages/PatientDashboard/PatientDashboard'
import Dashboard from "./modules/Dashboard/pages/Dashboard"
import Departments from './modules/Departments/pages/Departments'
import AddDepartment from './modules/Departments/pages/AddDepartment'
import Rooms from './modules/Rooms/pages/Rooms'
import { Provider } from "react-redux"
import store from "./store"

function App() {
 
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='admin' element={<AdminDashboard />}>
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
           <Route path='departments' element={<Departments />} />
           <Route path='addDepartment' element={<AddDepartment />} />
           <Route path='rooms' element={<Rooms />} />
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
