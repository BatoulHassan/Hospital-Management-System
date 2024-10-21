import {Box, Typography, MenuItem, Avatar} from '@mui/material'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FormPaper, InputField, AddButton } from './style'
import { getDepartments } from '../../../Departments/store/slices/viewDepartmentsSlice'
import { getSpecializations } from '../../../Specializations/store/slices/viewSpecializationsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { updateDoctor } from '../../store/slices/editDoctorSlice'

const EditDoctorForm = () => {

  const {loading, message, error} = useSelector(state => state.editDoctor)
  const departmentsState = useSelector(state => state.viewDepartments)
  const specializationsState = useSelector(state => state.specializations)
  const {doctors} = useSelector(state => state.viewDoctors)
  const dispatch = useDispatch()
  const {id} = useParams()
  const navigate = useNavigate()

  const doctor = doctors?.find(item => item.id === Number(id))
  //console.log(doctor)

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(getSpecializations())
 }, [])

 const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue} = useFormik({
  initialValues: {  
    id: doctor.id,
    name: doctor.user.name,
    email: doctor.user.email,
    // password: '',
    department_id: doctor.department_id,
    specialization_id: doctor.specialization_id,
    avatar: `https://pk.jamous-tech.com/storage/${doctor.user.avatar}`
  },
  validationSchema: Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    // password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    department_id: Yup.string().required('Required'),
    specialization_id: Yup.string().required('Required'),
    avatar: Yup.mixed().required('An image file is required')
  }),
  onSubmit: (values) => {  
    //console.log(values)
    const formData = new FormData()
    Object.entries(values).forEach(([key,value]) => {
        formData.append(key, value)
        console.log(key, value); 
    })
    //console.log("formData is: ", formData)
    dispatch(updateDoctor(values.id,formData))
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
      <PageTitle title='Edit Doctor:' />
      {departmentsState.loading && specializationsState.loading && 
               <Typography variant='h3'>Loading...</Typography>
      }
      {departmentsState.error || specializationsState.error && 
               <Typography variant='h3'>{departmentsState.error}</Typography>
      }
      {!departmentsState.loading && departmentsState.departments && 
         !specializationsState.loading &&  specializationsState.specializations &&
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
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                     }
              </Box>

              <Box sx={{mb: '1rem'}}>
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
              </Box>

              <Box sx={{mb: '1rem'}}>
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
              </Box>

              <Box sx={{mb: '1rem'}}>
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
              </Box>

              <Box sx={{mb: '1rem'}}>
                <Box sx={{width: {xs: '100%', sm: 'calc(50%)'}, 
                          boxSizing: 'border-box',
                          display: 'flex',alignItems: 'center',
                          justifyContent: 'space-between',
                          height: '56px',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          border: '1px solid #c4c4c4'}}>
                  <input name="avatar" type="file" id="uploadImg" className='inputFile' onChange={handleAvatarChange} onBlur={handleBlur}/>
                  <label htmlFor="uploadImg" className='fileLabel'>Edit image File</label>
                  <Avatar alt={values.name} src={values.avatar} />
                </Box>
                 {touched.avatar && errors.avatar &&
                        <Typography variant='body2' color='error'>{errors.avatar}</Typography>  
                  }
              </Box>

              <Box sx={{display: 'flex', gap: '1rem', justifyContent: {xs: 'space-between', sm: 'unset'}}}>
                 <AddButton type='submit'>
                   {loading ? "Editting..." : "Edit"}
                 </AddButton>

                 <AddButton onClick={handleNavigate}>Back to Doctors</AddButton>
              </Box>

           </form>
           {message && <AlertBox open={true} message={message} />}
           {error && <Typography variant='body2' color='error'>{error}</Typography>}
         </FormPaper>
      }
    </Box>
  )
}

export default EditDoctorForm