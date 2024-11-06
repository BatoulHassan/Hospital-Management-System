import { Typography, List, ListItem, ListItemText, Button } from "@mui/material"
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
import { useEffect } from "react";
import { logout } from "../../../store/slices/authSlice";
import { getAccountInfo } from "../../../modules/Account/store/slices/accountSlice";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import SidebarListItem from '../../SidebarListItem/SidebarListItem'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

const AdminSidebar = () => {

  const {isCollapsed} = useSelector(state => state.sidebar)
  const {isAuthenticated, loadingLogout} = useSelector(state => state.auth)
  const {accountInfo} = useSelector(state => state.account)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAccountInfo())
  }, [])

  const closeSidebar = () => {
    dispatch(setIsCollapsed(false))
 }

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    dispatch(logout())
  }
 

  const listData = [
    {icon: DomainIcon, mainTitle: 'Departments', viewPath: 'departments', viewLabel: 'View Departments', addPath: 'addDepartment', addLabel: 'Add Department' },
    {icon: MeetingRoomIcon, mainTitle: 'Rooms', viewPath: 'rooms', viewLabel: 'View Rooms', addPath: 'addRoom', addLabel: 'Add Room' },
    {icon: MedicalServicesIcon, mainTitle: 'Doctors', viewPath: 'doctors', viewLabel: 'View Doctors', addPath: 'addDoctor', addLabel: 'Add Doctor' },
    {icon: MedicationLiquidIcon, mainTitle: 'Specializations', viewPath: 'specializations', viewLabel: 'View', addPath: 'addSpecialization', addLabel: 'Add' },
    {icon: CalendarMonthIcon, mainTitle: 'Schedules', viewPath: 'schedules', viewLabel: 'View Schedules', addPath: 'addSchedules', addLabel: 'Add Schedules' },
    {icon: MoodBadIcon, mainTitle: 'Patients', viewPath: 'patients', viewLabel: 'View Patients', addPath: 'addPatient', addLabel: 'Add Patient' },
    {icon: MedicalServicesIcon, mainTitle: 'Services', viewPath: 'services', viewLabel: 'View Services', addPath: 'addService', addLabel: 'Add Service' },
    {icon: HealthAndSafetyIcon, mainTitle: 'Conditions', viewPath: 'medicalConditions', viewLabel: 'View', addPath: 'addMedical', addLabel: 'Add' },
    {icon: PersonRemoveAlt1Icon, mainTitle: "Patient's visits", viewPath: 'visits', viewLabel: 'View Visits', addPath: 'registerVisit', addLabel: 'Register visit' },
  ]

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
               <Typography variant="h6" sx={{color: '#595353'}}>{accountInfo?.name}</Typography>
           </ProfileBox>
           <List>

            <NavLink to="dashboard" style={({isActive}) => ({
                                          color: isActive ? '#2e7c67' : '#595353',
                                          textDecoration: 'none'})}>
              <ListItem sx={{pb: '0',pt: '5px'}}>
                  <HomeIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Dashboard" sx={{ml: '0.5rem'}} />
              </ListItem>
            </NavLink>
            {
              listData?.map((item,index) => (
                <SidebarListItem
                             key={index}
                             Icon={item.icon}
                             mainTitle={item.mainTitle} 
                             viewPath={item.viewPath} 
                             viewLabel={item.viewLabel} 
                             addPath={item.addPath} 
                             addLabel={item.addLabel} />
              ))
            }
          </List>

           <LogoutBox>
             <Button sx={{textTransform: 'capitalize'}} onClick={handleLogout}>
              <LogoutIcon sx={{color: '#2e7c67'}}/>
              <LogoutTypography variant="body2">
                {loadingLogout ? "Logging out..." : "Logout"}
              </LogoutTypography>
             </Button>
           </LogoutBox>
           
        </SidebarBox>
    </>
)}

export default AdminSidebar