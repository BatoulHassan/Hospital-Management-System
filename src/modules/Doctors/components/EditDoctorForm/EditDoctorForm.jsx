import {Box, Typography, MenuItem } from '@mui/material'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FormPaper, InputField, AddButton, 
         InputBox, ButtonContainer, TypographyError } from '../../../../Styles/Styles'
import { FileInputBox } from './style'
import { getDepartments } from '../../../Departments/store/slices/viewDepartmentsSlice'
import { getSpecializations } from '../../../Specializations/store/slices/viewSpecializationsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import {EditDoctorValidation} from './EditDoctorValidation'
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { updateDoctor, clearEdittingDoctorMsg } from '../../store/slices/editDoctorSlice'

const EditDoctorForm = () => {

  const {loading, message, error} = useSelector(state => state.editDoctor)
  const departmentsState = useSelector(state => state.viewDepartments)
  const specializationsState = useSelector(state => state.specializations)
  const {doctors} = useSelector(state => state.viewDoctors)
  const dispatch = useDispatch()
  const {id} = useParams()
  const navigate = useNavigate()

  const doctor = doctors?.find(item => item.id === Number(id))

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(getSpecializations())
    dispatch(clearEdittingDoctorMsg())
 }, [])

 const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue} = useFormik({
  initialValues: {  
    id: doctor.id,
    name: doctor.user.name,
    email: doctor.user.email,
    department_id: doctor.department_id,
    specialization_id: doctor.specialization_id,
    avatar: null,
  },
  validationSchema: EditDoctorValidation,
  onSubmit: (values) => {
    dispatch(updateDoctor(values))
    dispatch(clearEdittingDoctorMsg())
  },
 })

 const handleAvatarChange = (e) => {
  const file = e.currentTarget.files[0]
  setFieldValue("avatar", file)
 }

 const handleNavigate = () => {
  navigate('/admin/doctors')
}

  return (
    <Box sx={{padding: '1rem'}}>
      {departmentsState.loading && specializationsState.loading && 
               <Typography variant='h3'>Loading...</Typography>
      }
      {departmentsState.error || specializationsState.error && 
               <Typography variant='h3'>{departmentsState.error}</Typography>
      }
      {!departmentsState.loading && departmentsState.departments && 
         !specializationsState.loading &&  specializationsState.specializations &&
         <FormPaper>
           <PageTitle title='Edit Doctor:' />
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
                     type='email' 
                     name='email' 
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Email'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.email && errors.email &&
                          <Typography variant='body2' color='error'>{errors.email}</Typography>  
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

              <InputBox>
                <InputField  select
                     required
                     label='Specialization'
                     name='specialization_id'
                     value={values.specialization_id}
                     onChange={handleChange}
                     onBlur={handleBlur}      
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                     {
                      specializationsState.specializations?.map(specialization => (
                        <MenuItem key={specialization.id} value={specialization.id}>
                          {specialization.name}
                        </MenuItem>
                      ))
                    }
                </InputField>
                {touched.specialization_id && errors.specialization_id &&
                        <Typography variant='body2' color='error'>{errors.specialization_id}</Typography>  
                }
              </InputBox>

              <InputBox>
                <label>Edit image File</label>
                <FileInputBox>
                  <input name="avatar" type="file" onChange={handleAvatarChange} onBlur={handleBlur}/>
                </FileInputBox>
                 {touched.avatar && errors.avatar &&
                        <Typography variant='body2' color='error'>{errors.avatar}</Typography>  
                  }
              </InputBox>

              <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Editting..." : "Edit"}
                 </AddButton>

                 <AddButton onClick={handleNavigate}>Back to Doctors</AddButton>
              </ButtonContainer>

           </form>
           {message && <AlertBox open={true} message={message} />}
           {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
         </FormPaper>
      }
    </Box>
  )
}

export default EditDoctorForm