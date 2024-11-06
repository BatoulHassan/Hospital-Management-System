import { TextField, Box } from '@mui/material'
import { styled } from '@mui/material/styles';


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

export const InputBox = styled(Box)(() => ({
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }))


