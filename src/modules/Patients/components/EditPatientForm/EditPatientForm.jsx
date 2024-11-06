import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Box, Typography } from "@mui/material";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import {FileInputBox} from './style'
import { FormPaper, InputField, AddButton, InputBox, 
         ButtonContainer, TypographyError } from "../../../../Styles/Styles"
import AlertBox from "../../../../components/AlertBox/AlertBox";
import { updatePatient, clearEdittingPatientMsg } from "../../store/slices/editPatientSlice";
import { useEffect } from "react";

const EditPatientForm = () => {

  const {id} = useParams()
  const {patients} = useSelector(state => state.patients)
  const { message,loading,error } = useSelector(state => state.editPatient)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const patient = patients?.find(item => item.id === Number(id))
  const filteredPatient = patients.filter(item => item.id !== Number(id))
  const existingNationalNumbers = filteredPatient.map(item => item.national_id)

 useEffect(() => {
  dispatch(clearEdittingPatientMsg())
 }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue } = useFormik({
    initialValues: {  
      id: patient.id,
      name: patient.user.name,
      email: patient.user.email,
      national_id: patient.national_id,
      mobile_number: patient.mobile_number,
      residence_address: patient.residence_address,
      avatar: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
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
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(updatePatient(values))
      dispatch(clearEdittingPatientMsg())
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
        <PageTitle title='Edit Patient:' />
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
                <label>Edit image File</label>
                <FileInputBox>
                    <input name="avatar" 
                         type="file" 
                         onChange={handleAvatarChange} 
                         onBlur={handleBlur}/>
                </FileInputBox>
                 {touched.avatar && errors.avatar &&
                        <Typography variant='body2' color='error'>{errors.avatar}</Typography>  
                  }
              </InputBox>

              <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Editting..." : "Edit"}
                 </AddButton>

                 <AddButton onClick={handleNavigate}>Back to Patients</AddButton>
              </ButtonContainer>

        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>
                                {error}
                  </TypographyError>}
      </FormPaper>
    </Box>
  )
}

export default EditPatientForm