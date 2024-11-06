import { Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import Login from './MainPages/Login/Login'
import DoctorDashboard from './MainPages/DoctorDashboard/DoctorDashboard'
import PatientDashboard from './MainPages/PatientDashboard/PatientDashboard'
import Dashboard from "./modules/Dashboard/pages/Dashboard"
import { Provider } from "react-redux"
import store from "./store"
import Account from "./modules/Account/pages/Account"
import EditAccount from './modules/Account/pages/EditAccount'
import RoomsOfDepartment from "./modules/Departments/pages/RoomsOfDepartment"
import DepartmentsForDoctors from "./modules/Departments/pages/DepartmentsForDoctors"
import DepartmentsForPatient from "./modules/Departments/pages/DepartmentsForPatient"
import RoomsForDoctor from "./modules/Rooms/pages/RoomsForDoctor"
import AvailableRooms from "./modules/Departments/pages/AvailableRooms"
import AddConditionFromDoctor from "./modules/MedicalConditions/components/AddConditionFromDoctor/AddConditionFromDoctor"
import PatientsForDoctors from "./modules/Patients/pages/PatientsForDoctors"
import PatientConditions from './modules/MedicalConditions/pages/PatientConditions'
import PatientConditionsDetails from "./modules/MedicalConditions/components/PatientConditionsDetails/PatientConditionsDetails"
import AdminRoutes from "./routes/AdminRoutes"
import ConditionsForDoctor from "./modules/MedicalConditions/pages/ConditionsForDoctor"
import EditMedical from "./modules/MedicalConditions/pages/EditMedical"
import Details from "./modules/MedicalConditions/pages/Details"

function App() {
 
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route path='/*' element={<AdminRoutes />} />
   
        <Route path='doctor' element={<DoctorDashboard />} >
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
           <Route path='departments' element={<DepartmentsForDoctors />} />
           <Route path='departments/viewRooms/:id' element={<RoomsOfDepartment />} />
           <Route path='departments/availableRooms/:id' element={<AvailableRooms />} />
           <Route path='rooms' element={<RoomsForDoctor />} />
           <Route path="account" element={<Account />} />
           <Route path="editAccount" element={<EditAccount />} />
           <Route path='patients' element={<PatientsForDoctors />} />
           <Route path='medicalConditions' element={<ConditionsForDoctor />} />
           <Route path='medicalConditions/editMedical/:id' element={<EditMedical />} />
           <Route path='medicalConditions/details/:id' element={<Details />} />
           <Route path='addMedical' element={<AddConditionFromDoctor />} />
        </Route>

        <Route path='patient' element={<PatientDashboard />} >
           <Route index element={<Navigate to="dashboard" />} />
           <Route path='dashboard' element={<Dashboard />} />
           <Route path='departments' element={<DepartmentsForPatient />} />
           <Route path='medicalConditions' element={<PatientConditions />} />
           <Route path='medicalConditions/details/:id' element={<PatientConditionsDetails />} />
           <Route path="account" element={<Account />} />
           <Route path="editAccount" element={<EditAccount />} />
        </Route>   
      </Routes>
    </Provider>
  )
}

export default App
