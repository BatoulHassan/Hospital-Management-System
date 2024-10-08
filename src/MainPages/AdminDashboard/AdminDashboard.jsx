import { Box } from "@mui/material"
import AdminSidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar'
import Header from '../../components/Header/Header'
import { Outlet } from "react-router-dom"

const AdminDashboard = () => {
  
  return (
    <Box sx={{display: 'flex'}}>
      <AdminSidebar />
      <Box sx={{width: {xs: '100%', md: 'calc(100% - 200px)'} , 
                  position: {xs: 'unset', md: 'relative'}, 
                  left: {xs: 'unset', md: '200px'}}}>
              <Header />
              <Outlet />
      </Box>
    </Box>
  )
}

export default AdminDashboard