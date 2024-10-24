import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getDepartments } from "../../../Departments/store/slices/viewDepartmentsSlice"
import {clearEdittingServiceMsg, updateService} from '../../store/slices/editServiceSlice'
import { useEffect } from "react"
import { Box, Typography, MenuItem } from "@mui/material"
import { useFormik } from "formik"
import {EditServiceValidation} from './EditServiceValidation'
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { InputField, FormPaper, AddButton, InputBox, ButtonContainer, TypographyError } from './style'
import AlertBox from "../../../../components/AlertBox/AlertBox"

const EditServiceForm = () => {

  const {id} = useParams()
  const departmentsState = useSelector(state => state.viewDepartments)
  const {services} = useSelector(state => state.services)
  const {loading, error, message} = useSelector(state => state.editService)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const service = services?.find(item => item.id === Number(id))

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(clearEdittingServiceMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      id: service.id,
      name: service.name,
      type: service.type,
      description: service.description,
      special_instructions: service.special_instructions,
      department_id: service.department_id
    },
    validationSchema: EditServiceValidation,
    onSubmit: (values) => {
      console.log(values)
      dispatch(updateService(values))
      dispatch(clearEdittingServiceMsg())
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
        <PageTitle title='Edit Service:' />
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
                   {loading ? "Editting..." : "Edit"}
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

export default EditServiceForm