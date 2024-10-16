import { Button, Paper, TextField } from '@mui/material'
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

export const AddTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {  
  '&:hover fieldset': {  
    borderColor: '#59535370',   
  },  
  '&.Mui-focused fieldset': {  
    borderColor: '#6439ff', 
  },  
}, 
'& .MuiInputLabel-root.Mui-focused': {  
  color: '#6439ff', 
},
}))


export const AddButton = styled(Button)(() => ({
    background: '#2e7c67',
    color: 'white',
    width: '88px',
    display: 'block'
 }))

