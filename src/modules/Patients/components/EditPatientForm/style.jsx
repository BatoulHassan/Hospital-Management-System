import { Button, Paper, TextField, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

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

 export const FileInputBox = styled(Box)(({theme}) => ({
    width: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    padding: '8px 14px',
    borderRadius: '4px',
    border: '1px solid #c4c4c4',
    [theme.breakpoints.down('sm')]: {
       width: '100%'
  }
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