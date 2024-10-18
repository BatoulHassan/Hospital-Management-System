import { useNavigate, useParams } from "react-router-dom"
import { Box, Typography } from '@mui/material'
import { InputField, FormPaper, AddButton } from './style'
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup';  
import { clearEditDepartmentMessage, updateDepartment } from "../../store/slices/editDepartmentSlice"
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { useEffect } from "react"

const EditDepartmentForm = () => {

    const { departments } = useSelector(state => state.viewDepartments)
    const { message, error, loading } = useSelector(state => state.editDepartment)

    const {id} = useParams()
    const department = departments?.find(item => item.id === Number(id))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(clearEditDepartmentMessage())
    }, [])
  
    const {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
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
        //resetForm()
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
            <AddButton type='submit' sx={{width: '88px'}}>
              {loading ? "Editting..." : "Edit"}
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

export default EditDepartmentForm