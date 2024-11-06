import { Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from 'yup';
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { FormPaper, InputField, AddButton, InputBox,
         ButtonContainer, TypographyError } from "../../../../Styles/Styles"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { addNewPatient, clearAddingPatientMsg } from "../../store/slices/addPatientSlice"
import { useRef } from "react";

const AddPatientForm = () => {

    const {message, loading, error} = useSelector(state => state.addPatient)
    const {patients} = useSelector(state => state.patients)
    const existingNationalNumbers = patients.map(item => item.national_id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fileInputRef = useRef(null);

    const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue, resetForm } = useFormik({
        initialValues: {  
            name: '',
            email: '',
            password: '',
            national_id: '',
            mobile_number: '',
            residence_address: '',
            avatar: null
          },
          validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
            national_id: Yup.string()  
                            .matches(/^[0-9]*$/, 'National ID must be digits only')
                            .length(11, 'National ID must be exactly 11 digits')
                            .required('Required')
                            .test('is-unique', 'National ID must be unique', value => {  
                                return !existingNationalNumbers.includes(value)
            }),
            mobile_number: Yup.string()
                              .matches(/^[0-9]*$/, 'Mobile number must be digits only')
                              .max(15, 'Mobile number must be at most 15 digits')
                              .required('Required'),
            residence_address: Yup.string().required('Required'),
            avatar: Yup.mixed().required('An image file is required')
          }),
          onSubmit: (values) => {
            //console.log(values)
            const formData = new FormData()
            Object.entries(values).forEach(([key,value]) => {
               formData.append(key, value)
            })
            dispatch(addNewPatient(formData))
            resetForm()
            if (fileInputRef.current) {  
              fileInputRef.current.value = '';  
            } 
            dispatch(clearAddingPatientMsg())
          }
    })

    const handleAvatarChange = (e) => {
        const file = e.currentTarget.files[0]
        setFieldValue("avatar", file)
    }

    const handleNavigate = () => {
        navigate('/admin/patients')
      }

  return (
    <Box sx={{padding: '1rem'}}>
        <FormPaper>
           <PageTitle title='Add Patient:' />
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
                <InputField variant='outlined' 
                     type='text' 
                     name='national_id' 
                     value={values.national_id}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='National ID'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.national_id && errors.national_id &&
                          <Typography variant='body2' color='error'>{errors.national_id}</Typography>  
                     }
              </InputBox>

              <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='mobile_number' 
                     value={values.mobile_number}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Mobile'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.mobile_number && errors.mobile_number &&
                          <Typography variant='body2' color='error'>{errors.mobile_number}</Typography>  
                     }
              </InputBox>

              <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='residence_address' 
                     value={values.residence_address}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Residence Address'
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.residence_address && errors.residence_address &&
                          <Typography variant='body2' color='error'>{errors.residence_address}</Typography>  
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

                 <AddButton onClick={handleNavigate}>Back to Patients</AddButton>
              </ButtonContainer>
           </form>
           {message && <AlertBox open={true} message={message} />}
           {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
        </FormPaper>
    </Box>
  )
}

export default AddPatientForm