import { Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';

export const UpdateButton = styled(Button)(() => ({
    color: '#2e7c67', 
    textTransform: 'math-auto', 
    fontSize: '12px'
  }))

  export const ChangeButton = styled(Button)(() => ({
    backgroundColor: '#2e7c67', 
    color: 'white',
    textTransform: 'math-auto', 
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