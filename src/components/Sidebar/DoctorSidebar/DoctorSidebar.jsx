import { Typography, List, ListItem, ListItemText, Button } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapsed } from "../../../store/slices/sidebarSlice";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DomainIcon from '@mui/icons-material/Domain';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { SidebarBox, LogoBox, LogoTypography, ArrowIconButton, 
         ProfileBox, LogoutBox, LogoutTypography } from "../SidebarStyle";
import { useEffect } from "react"
import { logout } from "../../../store/slices/authSlice";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import ListItemWithViewRout from '../ListItemWithViewRout/ListItemWithViewRout'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SidebarListItem from "../../SidebarListItem/SidebarListItem";

const DoctorSidebar = () => {

  const {isCollapsed} = useSelector(state => state.sidebar)
  const {accountInfo} = useSelector(state => state.account)
  const {isAuthenticated, loadingLogout} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const closeSidebar = () => {
    dispatch(setIsCollapsed(false))
 }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [isAuthenticated])

  const listData = [
    {icon: DomainIcon, mainTitle: 'Departments', viewPath: 'departments', viewLabel: 'View Departments'},
    {icon: MeetingRoomIcon, mainTitle: 'Rooms', viewPath: 'rooms', viewLabel: 'View Rooms'},
    {icon: MoodBadIcon, mainTitle: 'Patients', viewPath: 'patients', viewLabel: 'View Patients'},
  ]


  return (
    <>
        <SidebarBox sx={{
                      left: {xs: `${isCollapsed ? "0" : '-100%'}`, md: '0'} ,
                     }}>
           <LogoBox>
              <LogoTypography variant="h6">Dashboard</LogoTypography>
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
              <ListItem>
                  <HomeIcon sx={{color: '#2e7c67'}}/>
                  <ListItemText primary="Dashboard" sx={{ml: '0.5rem'}} />
              </ListItem>
            </NavLink>

            {
              listData?.map((item,index) => (
                <ListItemWithViewRout
                             key={index}
                             Icon={item.icon}
                             mainTitle={item.mainTitle} 
                             viewPath={item.viewPath} 
                             viewLabel={item.viewLabel} />
              ))
            }

              <SidebarListItem
                             Icon={HealthAndSafetyIcon}
                             mainTitle='Conditions' 
                             viewPath='medicalConditions'
                             viewLabel='View' 
                             addPath='addMedical'
                             addLabel='Add' />
           </List>

           <LogoutBox>
             <Button sx={{textTransform: 'capitalize'}} onClick={handleLogout}>
              <LogoutIcon sx={{color: '#2e7c67'}}/>
              <LogoutTypography variant="body2">
                {loadingLogout ? "Loggin out..." : "Logout"}
              </LogoutTypography>
             </Button>
           </LogoutBox>
           
        </SidebarBox>
    </>
)}

export default DoctorSidebar