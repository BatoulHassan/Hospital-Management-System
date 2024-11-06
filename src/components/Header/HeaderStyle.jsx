import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material'

export const HeaderBox = styled(Box)(() => ({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    height: '57px',
    padding: '0 1rem',
    position: 'sticky',
    top: '0',
    zIndex: '99',
    background: 'ghostwhite',
    borderBottom: '0.5px solid rgb(230, 227, 227)'
  }));

  export const MenuIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: '3px', 
    padding: '0',
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'flex'
    }
  }));

  export const SearchBox = styled(Box)(({theme}) => ({
     display: 'flex',
     background: '#f2f0f0', 
     borderRadius: '3px',
     width: 'unset',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
  }))