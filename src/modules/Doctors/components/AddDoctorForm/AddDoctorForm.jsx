import { Box, Typography, MenuItem } from '@mui/material'
import { FormPaper, InputField, AddButton, InputBox, ButtonContainer, TypographyError } from './style'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { getDepartments } from '../../../Departments/store/slices/viewDepartmentsSlice'
import { getSpecializations } from '../../../Specializations/store/slices/viewSpecializationsSlice'
import { useFormik } from 'formik'
import {addNewDoctor, clearAddingDoctorMsg} from '../../store/slices/addDoctorSlice'
import {AddDoctorValidation} from './AddDoctorValidation'

const AddDoctorForm = () => {

  const {loading, error, message} = useSelector(state => state.addDoctor)
  const departmentsState = useSelector(state => state.viewDepartments)
  const specializationsState = useSelector(state => state.specializations)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  useEffect(() => {
     dispatch(clearAddingDoctorMsg())
     dispatch(getDepartments())
     dispatch(getSpecializations())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, 
          touched, errors, setFieldValue, resetForm} = useFormik({
    initialValues: {  
      name: '',
      email: '',
      password: '',
      department_id: '',
      specialization_id: '',
      avatar: null
    },
    validationSchema: AddDoctorValidation,
    onSubmit: (values) => {  
      const formData = new FormData()
      Object.entries(values).forEach(([key,value]) => {
        formData.append(key, value)
      })
      dispatch(addNewDoctor(formData))
      resetForm()
      if (fileInputRef.current) {  
        fileInputRef.current.value = '';  
      }
      dispatch(clearAddingDoctorMsg())
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
            <PageTitle title='Add Doctor:' />
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
                <InputField variant='outlined' 
                     type='password' 
                     name='password' 
                     value={values.password}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Password'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.password && errors.password &&
                          <Typography variant='body2' color='error'>{errors.password}</Typography>  
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
                <input name="avatar" 
                       ref={fileInputRef} 
                       type="file" 
                       accept="image/*"
                       onChange={handleAvatarChange} 
                       onBlur={handleBlur}/>
                 {touched.avatar && errors.avatar &&
                        <Typography variant='body2' color='error'>{errors.avatar}</Typography>  
                  }
              </InputBox>

              <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Adding..." : "Add"}
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

export default AddDoctorForm