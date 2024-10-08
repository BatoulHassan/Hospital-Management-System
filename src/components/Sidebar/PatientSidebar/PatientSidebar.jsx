import { Typography, List, ListItem, ListItemText, Button } from "@mui/material"
//import profileImg from '../../assets/profileImg.jpg'
import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapsed } from "../../../store/slices/sidebarSlice";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarBox, LogoBox, LogoTypography, ArrowIconButton, 
         ProfileBox, LogoutBox, LogoutTypography } from "../SidebarStyle";

const PatientSidebar = () => {

  const {isCollapsed} = useSelector(state => state.sidebar)
  const dispatch = useDispatch()

  const closeSidebar = () => {
    dispatch(setIsCollapsed(false))
 }

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
               {/* <img src={profileImg} alt='profileImg' style={{width: '40px', height: '40px', borderRadius: '50%'}}/> */}
               <Typography variant="h6" sx={{color: '#595353'}}>John Doe</Typography>
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
             
           </List>

           <LogoutBox>
             <Button>
              <LogoutIcon sx={{color: '#2e7c67'}}/>
              <LogoutTypography variant="body2">Logout</LogoutTypography>
             </Button>
           </LogoutBox>
           
        </SidebarBox>
    </>
)}

export default PatientSidebar