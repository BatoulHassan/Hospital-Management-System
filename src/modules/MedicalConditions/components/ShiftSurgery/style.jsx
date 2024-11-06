import { styled } from '@mui/material/styles';
import { Button, Box, TextField } from '@mui/material'

 export const InputDateBox = styled(Box)(() => ({
    marginBottom: '1rem', 
    display: 'flex',
    alignItems: 'center', 
    flexDirection: 'column'
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

export const ShiftButton = styled(Button)(() => ({
  backgroundColor: '#2e7c67', 
  color: 'white',
  textTransform: 'math-auto', 
}))