import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../MainPages/AdminDashboard/AdminDashboard.jsx'
import Dashboard from '../modules/Dashboard/pages/Dashboard.jsx'
import DepartmentsForAdmin from '../modules/Departments/pages/DepartmentsForAdmin.jsx'
import AddDepartment from '../modules/Departments/pages/AddDepartment.jsx'
import EditDepartment from '../modules/Departments/pages/EditDepartment.jsx'
import RoomsOfDepartment from '../modules/Departments/pages/RoomsOfDepartment.jsx'
import AvailableRooms from '../modules/Departments/pages/AvailableRooms.jsx'
import RoomsForAdmin from '../modules/Rooms/pages/RoomsForAdmin.jsx'
import AddRooms from '../modules/Rooms/pages/AddRooms.jsx'
import EditRoom from '../modules/Rooms/pages/EditRoom.jsx'
import DoctorsForAdmin from '../modules/Doctors/pages/DoctorsForAdmin.jsx'
import AddDoctor from '../modules/Doctors/pages/AddDoctor.jsx'
import DoctorSchedules from '../modules/Doctors/pages/DoctorSchedules.jsx'
import Account from '../modules/Account/pages/Account.jsx'
import EditAccount from '../modules/Account/pages/EditAccount.jsx'
import EditDoctor from '../modules/Doctors/pages/EditDoctor.jsx'
import Specializations from '../modules/Specializations/pages/Specializations.jsx'
import AddSpecialization from '../modules/Specializations/pages/AddSpecialization.jsx'
import EditSpecialization from '../modules/Specializations/pages/EditSpecialization.jsx'
import Schedules from '../modules/Schedules/pages/Schedules.jsx'
import AddSchedules from '../modules/Schedules/pages/AddSchedules.jsx'
import EditSchedule from '../modules/Schedules/pages/EditSchedule.jsx'
import PatientsForAdmin from '../modules/Patients/pages/PatientsForAdmin.jsx'
import AddPatient from '../modules/Patients/pages/AddPatient.jsx'
import EditPatient from '../modules/Patients/pages/EditPatient.jsx'
import Services from '../modules/Services/pages/Services.jsx'
import AddService from '../modules/Services/pages/AddService.jsx'
import EditService from '../modules/Services/pages/EditService.jsx'
import MedicalConditionsForAdmin from '../modules/MedicalConditions/pages/MediaclConditionsForAdmin.jsx'
import AddMedical from '../modules/MedicalConditions/pages/AddMedical.jsx'
import Details from '../modules/MedicalConditions/pages/Details.jsx'
import EditMedical from '../modules/MedicalConditions/pages/EditMedical.jsx'
import Visits from '../modules/Visits/pages/Visits.jsx'
import RegisterVisit from '../modules/Visits/pages/RegisterVisit.jsx'
import EditVisit from '../modules/Visits/pages/EditVisit.jsx'

const AdminRoutes = () => {

  return (
    <Routes>
        <Route path='admin' element={<AdminDashboard />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='departments' element={<DepartmentsForAdmin />} /> 
          <Route path='addDepartment' element={<AddDepartment />} />
          <Route path='departments/editDepartment/:id' element={<EditDepartment />} />
          <Route path='departments/viewRooms/:id' element={<RoomsOfDepartment />} />
          <Route path='departments/availableRooms/:id' element={<AvailableRooms />} />
          <Route path='rooms' element={<RoomsForAdmin />} />
          <Route path='addRoom' element={<AddRooms />} />
          <Route path='rooms/editRoom/:id' element={<EditRoom />} />
          <Route path='doctors' element={<DoctorsForAdmin />} />
          <Route path='addDoctor' element={<AddDoctor />} />
          <Route path='doctors/editDoctor/:id' element={<EditDoctor />} />
          <Route path='doctors/viewSchedules/:id' element={<DoctorSchedules />} />
          <Route path="account" element={<Account />} />
          <Route path="editAccount" element={<EditAccount />} />
          <Route path="specializations" element={<Specializations />} />
          <Route path="addSpecialization" element={<AddSpecialization />} />
          <Route path='specializations/editSpecialization/:id' element={<EditSpecialization />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="addSchedules" element={<AddSchedules />} />
          <Route path="schedules/editSchedule/:id" element={<EditSchedule />} />
          <Route path='patients' element={<PatientsForAdmin />} />
          <Route path='addPatient' element={<AddPatient />} />
          <Route path="patients/editPatient/:id" element={<EditPatient />} />
          <Route path='services' element={<Services />} />
          <Route path='addService' element={<AddService />} />
          <Route path="services/editService/:id" element={<EditService />} />
          <Route path='medicalConditions' element={<MedicalConditionsForAdmin />} />
          <Route path='addMedical' element={<AddMedical />} />
          <Route path='medicalConditions/details/:id' element={<Details />} />
          <Route path='medicalConditions/editMedical/:id' element={<EditMedical />} />
          <Route path='visits' element={<Visits />} />
          <Route path='registerVisit' element={<RegisterVisit />} />
          <Route path='visits/editVisit/:id' element={<EditVisit />} />
        </Route>
    </Routes>
  )
}

export default AdminRoutes