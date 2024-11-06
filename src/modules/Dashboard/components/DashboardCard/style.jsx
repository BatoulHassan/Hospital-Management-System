import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'

export const CardBox = styled(Box)(({theme}) => ({
    width: 'calc((100% / 3) - 1rem)',
    [theme.breakpoints.down('md')]:{
        width: 'calc((100% / 2) - 1rem)',
    },
    [theme.breakpoints.down('sm')]:{
        width: '100%',
    }
  }));