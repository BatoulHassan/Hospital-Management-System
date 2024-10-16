import { useNavigate, useParams } from "react-router-dom"
import { Box, Typography } from '@mui/material'
import { InputField, FormPaper, AddButton } from './style'
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup';  
import { updateDepartment } from "../../store/slices/editDepartmentSlice"
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { showAlert } from "../../../../store/slices/alertSlice"

const EditDepartmentForm = () => {

    const { departments } = useSelector(state => state.ViewDepartments)
    const { open } = useSelector(state => state.alert)

    const {id} = useParams()
    const department = departments?.find(item => item.id === Number(id))
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const {values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm} = useFormik({
      initialValues:{
        id: department.id,
        name: department.name
      },
      validationSchema: Yup.object({  
        name: Yup.string()  
          .required('Department name is required')  
          .min(2, 'Must be at least 2 characters long'),  
      }),
      onSubmit: (values) => {
        dispatch(updateDepartment(values))
        resetForm()
        dispatch(showAlert())
      }
    })

    const handleNavigate = () => {
      navigate('/admin/departments')
    }

  return (
    <Box sx={{padding: '1rem'}}>
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
                     sx={{width: '50%'}}  />
                      {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                     }
          </Box>
          <Box sx={{display: 'flex', gap: '1rem'}}>
            <AddButton type='submit' sx={{width: '88px'}}>Edit</AddButton>
            <AddButton onClick={handleNavigate}>Back to departments</AddButton>
          </Box>
         
        </form>
     </FormPaper>
     {open && <AlertBox open={open} message='Department Updated Successfully' /> }
  </Box>
  )
}

export default EditDepartmentForm