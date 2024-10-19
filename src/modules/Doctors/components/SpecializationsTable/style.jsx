import { styled } from '@mui/material/styles';
import { TableRow, Button } from '@mui/material'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)':{
      backgroundColor: theme.palette.action.hover,
    },
  }))

  export const ActionButton = styled(Button)(() => ({
    background: '#2e7c67',
    color: 'white',
    fontSize: '12px',
    textTransform: 'capitalize'
 }))