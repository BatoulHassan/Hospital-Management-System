import { Box } from "@mui/material"
import Header from '../../components/Header/Header'
import { Outlet } from "react-router-dom"
import PatientSidebar from '../../components/Sidebar/PatientSidebar/PatientSidebar'

const PatientDashboard = () => {
  return (
    <Box sx={{display: 'flex'}}>
      <PatientSidebar />
      <Box sx={{width: {xs: '100%', md: 'calc(100% - 200px)'} , 
                  position: {xs: 'unset', md: 'relative'}, 
                  left: {xs: 'unset', md: '200px'}}}>
              <Header />
              <Outlet />
      </Box>
    </Box>
  )
}

export default PatientDashboard