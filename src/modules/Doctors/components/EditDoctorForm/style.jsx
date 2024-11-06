import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';

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
