import { Box, Paper, Typography } from "@mui/material"
import { EditButton, InputField } from "./style"
import { clearMessages, editAccountInfo } from "../../store/slices/accountSlice"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup'
import UpdatePassword from "../UpdatePassword/UpdatePassword"
import { useNavigate } from "react-router-dom"
import PageTitle from '../../../../components/PageTitle/PageTitle'

const EditAccountForm = () => {

   const {accountInfo, successMessage, errorMessage, loadingEditting} = useSelector(state => state.account)
   const {roles} = useSelector(state => state.auth)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   
   const {values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
        initialValues: { 
            name: accountInfo.name,
            email: accountInfo.email,  
            current_password: '',
          },
         validationSchema: Yup.object({
            name: Yup.string().required('Required'), 
            email: Yup.string().email('Invalid email address').required('Required'),
            current_password: Yup.string().required('Required'),
         }),
          onSubmit: (values) => {  
            dispatch(editAccountInfo(values)) 
            },
    })

    const handleNavigate = () => {
      dispatch(clearMessages())
      if(roles === 'admin'){
         navigate('/admin/account')
      }else if(roles === 'doctor'){
         navigate('/doctor/account')
      }else if(roles === 'Patient'){
         navigate('/patient/account')
      }
    }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', pt: '1rem'}}>
        <Paper sx={{p: '1rem', width: {xs: '100%', sm: '60%'} }}>
            <PageTitle title='Edit your account' />
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
               <InputField variant='outlined' 
                       type='text' 
                       name='name' 
                       label='User Name'
                       value={values.name}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense"/>
                      {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                       } 
               <InputField variant='outlined' 
                       type='email' 
                       name='email' 
                       label='Email'
                       value={values.email}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense"/>
                       {touched.email && errors.email &&
                          <Typography variant='body2' color='error'>{errors.email}</Typography>  
                       } 
               <InputField variant='outlined' 
                       type='password' 
                       name='current_password' 
                       label='Enter your password to confirm updating'
                       value={values.current_password}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense" />
                       {touched.current_password && errors.current_password &&
                          <Typography variant='body2' color='error'>{errors.current_password}</Typography>  
                       }
                <UpdatePassword />
                
                <Box sx={{display: 'flex', gap: '0.5rem', justifyContent: {xs: 'space-between', sm: 'unset'}}}>
                  <EditButton type='submit' >
                        {loadingEditting ? 'Editting...' : 'Edit Account'}  
                  </EditButton>
                  <EditButton onClick={handleNavigate}>
                          Back
                  </EditButton>
                </Box>
                
            </form>
            {
               successMessage &&
                  <Typography variant='body2' color='success.main'>
                     Your account updatded successfully!
                  </Typography>
                                    
            }                                    
            {   
               errorMessage &&
                  <Typography variant='body2' color='error.main'>
                     Maybe your password invalid or there is something wrong, try again!
                  </Typography>
             }
        </Paper>
    </Box>
  )
}

export default EditAccountForm