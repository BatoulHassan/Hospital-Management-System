import { Typography, List, ListItem, ListItemText, Button,Collapse } from "@mui/material"
//import profileImg from '../../assets/profileImg.jpg'
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapsed } from "../../../store/slices/sidebarSlice";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DomainIcon from '@mui/icons-material/Domain';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { SidebarBox, LogoBox, LogoTypography, ArrowIconButton, 
         ProfileBox, LogoutBox, LogoutTypography } from "../SidebarStyle";
import { useEffect, useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { logout } from "../../../store/slices/authSlice";
import { getAccountInfo } from "../../../modules/Account/store/slices/accountSlice";

const AdminSidebar = () => {

  const {isCollapsed} = useSelector(state => state.sidebar)
  const {isAuthenticated} = useSelector(state => state.auth)
  const {accountInfo} = useSelector(state => state.account)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAccountInfo())
  }, [])

  const closeSidebar = () => {
    dispatch(setIsCollapsed(false))
 }

  const [openDropdown, setOpenDropdown] = useState({
    departments: false,
    rooms: false,
    doctors: false,
  });

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
        <SidebarBox sx={{
                      left: {xs: `${isCollapsed ? "0" : '-100%'}`, md: '0'} ,
                     }}>
           <LogoBox>
              <LogoTypography variant="h6">Hospital</LogoTypography>
              <ArrowIconButton onClick={closeSidebar}>
                <ArrowBackIosNewIcon fontSize="small" />
              </ArrowIconButton>
           </LogoBox>
           <ProfileBox>
               {/* <img src={profileImg} alt='profileImg' style={{width: '40px', height: '40px', borderRadius: '50%'}}/> */}
               <Typography variant="h6" sx={{color: '#595353'}}>{accountInfo?.name}</Typography>
           </ProfileBox>
           <List>

            <NavLink to="dashboard" style={({isActive}) => ({
                                          color: isActive ? '#2e7c67' : '#595353',
                                          textDecoration: 'none'})}>
              <ListItem>
                  <HomeIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Dashboard" sx={{ml: '0.5rem'}} />
              </ListItem>
            </NavLink>

            <ListItem onClick={() => 
                        setOpenDropdown((prevState) => ({...prevState, departments: (!openDropdown.departments)}))
                        }>
                  <DomainIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Departments" sx={{ml: '0.5rem',color: '#595353'}} />
                  {openDropdown.departments ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDropdown.departments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                     <NavLink to="departments" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                       <ListItemText sx={{pl: '30px'}} primary="View Departments" />
                     </NavLink>
                     <NavLink to="addDepartment" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                        <ListItemText sx={{pl: '30px'}} primary="Add Department" />
                     </NavLink>  
                </List>
            </Collapse>

            <ListItem onClick={() => 
                         setOpenDropdown((prevState) => ({...prevState, rooms: (!openDropdown.rooms)}))
                       }>
                  <MeetingRoomIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Rooms" sx={{ml: '0.5rem',color: '#595353'}} />
                  {openDropdown.rooms ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDropdown.rooms} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                     <NavLink to="rooms" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                       <ListItemText sx={{pl: '30px'}} primary="View Rooms" />
                     </NavLink>
                     <NavLink to="addRoom" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                        <ListItemText sx={{pl: '30px'}} primary="Add Room" />
                     </NavLink>  
                </List>
            </Collapse>

            <ListItem onClick={() => 
                         setOpenDropdown((prevState) => ({...prevState, doctors: (!openDropdown.doctors)}))
                       }>
                  <MedicalServicesIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Doctors" sx={{ml: '0.5rem',color: '#595353'}} />
                  {openDropdown.doctors ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDropdown.doctors} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                     <NavLink to="doctors" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                       <ListItemText sx={{pl: '30px'}} primary="View Doctors" />
                     </NavLink>
                     <NavLink to="addDoctor" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                        <ListItemText sx={{pl: '30px'}} primary="Add Doctor" />
                     </NavLink>
                     <NavLink to="specializations" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                        <ListItemText sx={{pl: '30px'}} primary="Specializations" />
                     </NavLink>
                     <NavLink to="addSpecialization" style={({isActive}) => ({
                                              color: isActive ? '#2e7c67' : '#595353',
                                              textDecoration: 'none'})}>
                        <ListItemText sx={{pl: '30px'}} primary="Add Specialization" />
                     </NavLink>
                </List>
            </Collapse>
           </List>

           <LogoutBox>
             <Button onClick={handleLogout}>
              <LogoutIcon sx={{color: '#2e7c67'}}/>
              <LogoutTypography variant="body2">Logout</LogoutTypography>
             </Button>
           </LogoutBox>
           
        </SidebarBox>
    </>
)}

export default AdminSidebar