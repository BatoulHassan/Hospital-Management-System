import { styled } from '@mui/material/styles';
import { TableRow, Button, TableCell, Paper, TextField, Box, Typography } from '@mui/material'

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

 export const ActionTableCell = styled(TableCell)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}))

export const FormPaper = styled(Paper)(() => ({
  padding:'1rem',
}))

export const InputField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {  
  '&:hover fieldset': {  
    borderColor: '#59535370',   
  },  
  '&.Mui-focused fieldset': {  
    borderColor: '#2e7c67', 
  },  
}, 
'& .MuiInputLabel-root.Mui-focused': {  
  color: '#2e7c67', 
},
}))

export const AddButton = styled(Button)(() => ({
  background: '#2e7c67',
  color: 'white',
  display: 'block',
  textTransform: 'capitalize'
}))

export const InputBox = styled(Box)(() => ({
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const ButtonContainer = styled(Box)(({theme}) => ({
  display: 'flex', 
  gap: '1rem',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
     width: 'space-between'
}
}))

export const TypographyError = styled(Typography)(() => ({
  display: 'flex', 
  justifyContent: 'center',
}))