import { useDispatch, useSelector } from "react-redux"
import { getDepartments } from "../../../Departments/store/slices/viewDepartmentsSlice"
import { useEffect } from "react"
import { useFormik } from "formik"
import { AddServiceValidation } from "./AddServiceValidation"
import { Box, Typography, MenuItem } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { InputField, FormPaper, AddButton, InputBox, 
         ButtonContainer, TypographyError } from '../../../../Styles/Styles'
import { useNavigate } from "react-router-dom"
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { addNewService, clearAddingServiceMsg } from "../../store/slices/addServiceSlice"

const AddServiceForm = () => {

  const departmentsState = useSelector(state => state.viewDepartments)
  const {loading, error, message} = useSelector(state => state.addService)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(clearAddingServiceMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {  
      name: '',
      type: '',
      description: '',
      special_instructions: '',
      department_id: '',
    },
    validationSchema: AddServiceValidation,
    onSubmit: (values) => {
      dispatch(addNewService(values))
      dispatch(clearAddingServiceMsg())
      resetForm()
    }
  })

  const handleNavigate = () => {
    navigate('/admin/services')
  }

  return (
    <Box sx={{padding: '1rem'}}>
      {departmentsState.loading && <Typography variant='h3'>Loading...</Typography>}
      {!departmentsState.loading && departmentsState.departments && 
      <FormPaper>
        <PageTitle title='Add Service:' />
        <form onSubmit={handleSubmit}>
          <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='name' 
                     value={values.name}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Name'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                     }
          </InputBox>

          <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='type' 
                     value={values.type}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Type'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.type && errors.type &&
                          <Typography variant='body2' color='error'>{errors.type}</Typography>  
                     }
          </InputBox>

          <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='description' 
                     value={values.description}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Description'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.description && errors.description &&
                          <Typography variant='body2' color='error'>{errors.description}</Typography>  
                     }
          </InputBox>

          <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='special_instructions' 
                     value={values.special_instructions}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Special Instructions'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.special_instructions && errors.special_instructions &&
                          <Typography variant='body2' color='error'>{errors.special_instructions}</Typography>  
                     }
          </InputBox>

          <InputBox>
            <InputField  select
                     required
                     label='Department'
                     name='department_id'
                     value={values.department_id}
                     onChange={handleChange}
                     onBlur={handleBlur}      
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                    {
                      departmentsState.departments?.map(department => (
                        <MenuItem key={department.id} value={department.id}>
                          {department.name}
                        </MenuItem>
                      ))
                    }
            </InputField>
            {touched.department_id && errors.department_id &&
                        <Typography variant='body2' color='error'>{errors.department_id}</Typography>  
            }
          </InputBox>

          <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Adding..." : "Add"}
                 </AddButton>

                 <AddButton onClick={handleNavigate}>Back to services</AddButton>
          </ButtonContainer>
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
      </FormPaper>
      }
    </Box>
  )
}

export default AddServiceForm