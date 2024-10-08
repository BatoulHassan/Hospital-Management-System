import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material'

export const SidebarBox = styled(Box)(() => ({
    height: '100vh', 
    width: '200px', 
    borderRight: '0.5px solid rgb(230, 227, 227)',
    position: 'fixed',
    zIndex: '100',
    transition: 'left 0.5s ease',
    background: 'ghostwhite',
  }));

  export const LogoBox = styled(Box)(() => ({
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center', 
    borderBottom: '0.5px solid rgb(230, 227, 227)',
    height: '57px'
  }));

  export const LogoTypography = styled(Typography)(() => ({
    color: '#2e7c67', 
    margin: '0 auto'
  }));

  export const ArrowIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: '3px',
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
  }));

  export const ProfileBox = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '1rem 0'
  }));

  export const LogoutBox = styled(Box)(() => ({
    padding: '8px 16px', 
    position: 'absolute', 
    bottom: '1%'
  }));

  export const LogoutTypography = styled(Typography)(() => ({
    marginLeft: '0.5rem', 
    color: '#595353',
    fontWeight: '500'
  }));