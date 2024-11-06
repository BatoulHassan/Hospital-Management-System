import { Typography, List, ListItem, ListItemText, Button } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapsed } from "../../../store/slices/sidebarSlice";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarBox, LogoBox, LogoTypography, ArrowIconButton, 
         ProfileBox, LogoutBox, LogoutTypography } from "../SidebarStyle";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import ListItemWithViewRout from '../ListItemWithViewRout/ListItemWithViewRout'
import { useEffect } from "react";
import { getAccountInfo } from "../../../modules/Account/store/slices/accountSlice";
import { logout } from "../../../store/slices/authSlice";

const PatientSidebar = () => {

  const {isCollapsed} = useSelector(state => state.sidebar)
  const {accountInfo} = useSelector(state => state.account)
  const {isAuthenticated, loadingLogout} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAccountInfo())
  }, [])

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [isAuthenticated])

  const closeSidebar = () => {
    dispatch(setIsCollapsed(false))
 }

 const handleLogout = () => {
  dispatch(logout())
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

            <ListItemWithViewRout
                             Icon={HealthAndSafetyIcon}
                             mainTitle="Conditions" 
                             viewPath="medicalConditions" 
                             viewLabel="View" />
             
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

export default PatientSidebar