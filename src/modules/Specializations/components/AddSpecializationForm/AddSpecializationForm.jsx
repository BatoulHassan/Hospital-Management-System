import {Box, Typography} from '@mui/material'
import { FormPaper, InputField, AddButton, InputBox, ButtonContainer, TypographyError } from './style'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';  
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../../../components/AlertBox/AlertBox';
import { useEffect } from 'react';
import { addNewSpecialization, clearAddingSpecializeMsg } from '../../store/slices/addSpecializationSlice';
import PageTitle from '../../../../components/PageTitle/PageTitle';

const AddSpecializationForm = () => {

    const {loading, message, error} = useSelector(state => state.addSpecialization)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearAddingSpecializeMsg())
    }, [])

    const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
        initialValues: {  
            name: '',  
          },
          validationSchema: Yup.object({  
            name: Yup.string()  
              .required('Specialization name is required')  
              .min(2, 'Must be at least 2 characters long'),  
          }),
          onSubmit: (values) => {
            dispatch(addNewSpecialization(values)) 
            resetForm();
            dispatch(clearAddingSpecializeMsg())
          },
    })

    const handleNavigate = () => {
        navigate('/admin/specializations')
      }

  return (
    <Box sx={{padding: '1rem'}}>
        <FormPaper>
            <form onSubmit={handleSubmit}>
              <PageTitle title='Add Specialization:' />
              <InputBox>
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
              </InputBox>

              <ButtonContainer>
                 <AddButton type='submit' sx={{width: '88px'}}>
                   {loading ? "Adding..." : "Add"}
                 </AddButton>
                 <AddButton onClick={handleNavigate}>Back to Specializations</AddButton>
              </ButtonContainer>
            </form>
            {message && <AlertBox open={true} message={message} />}
            {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
        </FormPaper>
    </Box>
  )
}

export default AddSpecializationForm