import { Box, InputLabel, Select } from '@mui/material'
import { styled } from '@mui/material/styles';

export const SelectLabel = styled(InputLabel)(() => ({
  '&.Mui-focused': {  
    color: '#2e7c67',  
  },
}))

export const SelectField = styled(Select)(() => ({
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {  
    borderColor: '#2e7c67', 
  },  
  '&:hover .MuiOutlinedInput-notchedOutline': {  
    borderColor: '#2e7c67', 
  },
}))

export const InputDateBox = styled(Box)(() => ({
  marginBottom: '1rem', 
  display: 'flex',
  alignItems: 'center', 
  flexDirection: 'column'
}))
