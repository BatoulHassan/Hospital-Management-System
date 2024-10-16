import { Paper, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

export const FormPaper = styled(Paper)(({theme}) => ({
   position: 'absolute',
   zIndex: '10' , 
   top: '50%', 
   left: '50%', 
   transform: 'translate(-50%, -50%)', 
   background: 'white', 
   padding:'1rem',
   [theme.breakpoints.down('sm')]: {
    width: '80%'
   }
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

export const EditButton = styled(Button)(() => ({
  background: '#2e7c67', 
  color: 'white',
  mt: '1rem',
  textTransform: 'math-auto'
}))