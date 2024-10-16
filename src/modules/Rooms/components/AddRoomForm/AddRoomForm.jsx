import { Box, MenuItem } from '@mui/material'
import { InputField, FormPaper, AddButton } from './style'

const AddRoomForm = () => {
  return (
    <Box sx={{padding: '1rem'}}>
    <FormPaper>
      <form>
        <InputField variant='outlined' 
                     type='number'
                     label='Room ID'
                     sx={{width: '50%', mb: '1rem'}}  />

        <InputField  select
                     required
                     label='Departments ID'      
                     sx={{mb: '1rem', width: '50%', display: 'flex'}}>
                    
        </InputField>

         <InputField variant='outlined' 
                     type='number'
                     label='Room Number'
                     sx={{width: '50%', mb: '1rem'}}  />

         <InputField select
                     required
                     label='Room Type'      
                     sx={{mb: '1rem', width: '50%', display: 'flex'}}>
                  <MenuItem value='ICU'>ICU</MenuItem>
                  <MenuItem value='private'>private</MenuItem>
                  <MenuItem value='semi-private'>semi-private</MenuItem>
        </InputField>

        <InputField select
                     required
                     label='Room Status'
                     name='status'
                     sx={{mb: '1rem', width: '50%', display: 'flex'}}>
                  <MenuItem value='vacant'>vacant</MenuItem>
                  <MenuItem value='occupied'>occupied</MenuItem>
                  <MenuItem value='maintenance'>maintenance</MenuItem>
        </InputField>

        <AddButton type='submit'>Add</AddButton>
      </form>
    </FormPaper>
  </Box>
  )
}

export default AddRoomForm