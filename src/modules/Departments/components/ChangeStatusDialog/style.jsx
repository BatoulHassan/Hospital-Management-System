import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material'

export const InputField = styled(TextField)(() => ({
    width: '100%',
    display: 'flex',
    marginTop: '0.5rem',
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

export const ActionButton = styled(Button)(() => ({
    background: '#2e7c67',
    color: 'white',
    fontSize: '12px',
    textTransform: 'capitalize'
 }))