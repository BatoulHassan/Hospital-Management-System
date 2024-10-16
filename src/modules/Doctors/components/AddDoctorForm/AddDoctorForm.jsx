import { Box, MenuItem } from '@mui/material'
import { FormPaper, InputField, AddButton } from './style'

const AddDoctorForm = () => {

  return (

    <Box sx={{padding: '1rem'}}>
        <FormPaper>
            <form>
                <InputField variant='outlined' 
                            required
                            type='number' 
                            label='Doctor ID'
                            sx={{width: '50%', mb: '1rem'}}  />

                <InputField  select
                            required
                            label='Departments ID'      
                            sx={{mb: '1rem', width: '50%', display: 'flex'}}>
                    
                </InputField>

                <InputField variant='outlined' 
                            required
                            type='text' 
                            label='Doctor Name'
                            sx={{width: '50%', mb: '1rem', display: 'flex'}}  />

                <InputField variant='outlined' 
                            required
                            type='text' 
                            label='Specialization'
                            sx={{width: '50%', mb: '1rem', display: 'flex'}}  />

                <InputField variant='outlined' 
                            required
                            type='text' 
                            label='Scheduals'
                            sx={{width: '50%', mb: '1rem', display: 'flex'}}  />

                <InputField  select
                            required
                            label='Availability'      
                            sx={{mb: '1rem', width: '50%', display: 'flex'}}>
                        <MenuItem value='available'>available</MenuItem>
                        <MenuItem value='unAvailable'>un available</MenuItem>
                </InputField>

                <AddButton type='submit'>Add</AddButton>
            </form>
        </FormPaper>
    </Box>
  )
}

export default AddDoctorForm