import {Box, InputBase, IconButton, Typography, Menu, MenuItem} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCollapsed } from '../../store/slices/sidebarSlice';
import { HeaderBox, MenuIconButton, SearchBox } from './HeaderStyle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountInfo } from '../../modules/Account/store/slices/accountSlice';

const Header = () => {

   const { roles } = useSelector(state => state.auth)
   const { accountInfo } = useSelector(state => state.account)

   const [anchorEl, setAnchorEl] = useState(null);
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
    dispatch(getAccountInfo())
   }, [])

   const openSidebar = () => {
      dispatch(setIsCollapsed(true))
   }

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    const routToAccount = () => {
      if(roles === 'admin'){
        navigate('/admin/account')
      }else if(roles === 'doctor'){
        navigate('/doctor/account')
      }else if(roles === 'Patient'){
        navigate('/patient/account')
      }
      
      handleClose()
    }

  return (
    <HeaderBox>
       <MenuIconButton onClick={openSidebar}>
          <MenuIcon/>
       </MenuIconButton>
       <SearchBox>
         <InputBase sx={{ml: '0.5rem'}} placeholder='Search' />
         <IconButton>
           <SearchIcon/>
         </IconButton>
       </SearchBox>

       <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Typography variant='body2'>{accountInfo?.name}</Typography>

        <IconButton onClick={handleMenu}>
           <PersonIcon/>
        </IconButton>
         
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={routToAccount}>My account</MenuItem>
          </Menu>
    
       </Box>
    </HeaderBox>
  )
}

export default Header