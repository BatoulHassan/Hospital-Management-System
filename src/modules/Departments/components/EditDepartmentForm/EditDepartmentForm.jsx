import { useNavigate, useParams } from "react-router-dom"
import { Box, Typography } from '@mui/material'
import { InputField, FormPaper, AddButton, InputBox, 
         ButtonContainer, TypographyError } from '../../../../Styles/Styles'
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup';  
import { clearEditDepartmentMessage, updateDepartment } from "../../store/slices/editDepartmentSlice"
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { useEffect } from "react"
import PageTitle from "../../../../components/PageTitle/PageTitle"

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
        dispatch(clearEditDepartmentMessage())
      }
    })

    const handleNavigate = () => {
      navigate('/admin/departments')
    }

  return (
    <Box sx={{padding: '1rem'}}>
      <FormPaper>
        <PageTitle title="Edit Department:" />
        <form onSubmit={handleSubmit}>
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
              {loading ? "Editting..." : "Edit"}
            </AddButton>
            <AddButton onClick={handleNavigate}>Back to departments</AddButton>
          </ButtonContainer>
         
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
     </FormPaper>
  </Box>
  )
}

export default EditDepartmentForm