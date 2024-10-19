import { Box, Typography } from '@mui/material'
import { InputField, FormPaper, AddButton } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { addNewDepartment, clearAddingMessage } from '../../store/slices/AddDepartmentSlice'
import * as Yup from 'yup';  
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../../../components/AlertBox/AlertBox';
import { useEffect } from 'react';
import PageTitle from '../../../../components/PageTitle/PageTitle';

const AddDepartmentForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {message, error, loading} = useSelector(state => state.addDepartment)
 
  useEffect(() => {
    dispatch(clearAddingMessage())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {  
      name: '',  
    },
    validationSchema: Yup.object({  
      name: Yup.string()  
        .required('Department name is required')  
        .min(2, 'Must be at least 2 characters long'),  
    }),
    onSubmit: (values) => {  
      dispatch(addNewDepartment(values)) 
      resetForm();
    }, 
  })

  const handleNavigate = () => {
    navigate('/admin/departments')
  }

  return (
  <Box sx={{padding: '1rem'}}>
    <PageTitle title='Add Department:' />
    <FormPaper>
      <form onSubmit={handleSubmit}>
          <Box sx={{mb: '1rem'}}>
              <InputField variant='outlined' 
                     type='text' 
                     name='name' 
                     value={values.name}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Name'
                     size='small' 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                     }
            </Box>
            <Box sx={{display: 'flex', gap: '1rem', justifyContent: {xs: 'space-between', sm: 'unset'}}}>
              <AddButton type='submit' sx={{width: '88px'}}>
                {loading ? "Adding..." : "Add"}
              </AddButton>
              <AddButton onClick={handleNavigate}>Back to departments</AddButton>
            </Box>
      </form>
      {message && <AlertBox open={true} message={message} />}
      {error && <Typography variant='body2' color='error'>{error}</Typography>}
    </FormPaper>
    
  </Box>
  )
}

export default AddDepartmentForm