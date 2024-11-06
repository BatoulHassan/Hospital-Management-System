import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material'

 export const ActionTableCell = styled(TableCell)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}))