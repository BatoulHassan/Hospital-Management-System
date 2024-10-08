import {Box, InputBase, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { setIsCollapsed } from '../../store/slices/sidebarSlice';
import { HeaderBox, MenuIconButton, SearchBox } from './HeaderStyle';

const Header = () => {

   const dispatch = useDispatch()

   const openSidebar = () => {
      dispatch(setIsCollapsed(true))
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
       <Box>
        <IconButton>
           <NotificationsIcon/>
        </IconButton>

        <IconButton>
           <SettingsIcon/>
        </IconButton>

        <IconButton>
           <PersonIcon/>
        </IconButton>
       </Box>
    </HeaderBox>
  )
}

export default Header