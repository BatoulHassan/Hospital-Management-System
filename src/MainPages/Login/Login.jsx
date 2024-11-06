import loginBg from '../../assets/loginBg.jpg'
import {Box, Button,Typography} from '@mui/material'
import { FormPaper, InputField } from './LoginStyle'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoginError, login } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

  const{ roles, isAuthenticated , loading, error} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm} = useFormik({  
    initialValues: { 
      email: '',  
      password: '', 
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'), 
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'), 
    }),
    onSubmit: (values) => {  
      dispatch(login(values))
      dispatch(clearLoginError())
      resetForm()
      }, 
})

useEffect(() => {  
  if (isAuthenticated) {  
      directToPages()
  }  
}, [isAuthenticated, navigate]);

const directToPages = () => {
  switch (roles) {  
    case 'admin':  
      navigate('/admin')  
      break;  
    case 'doctor':  
      navigate('/doctor') 
      break;  
    case 'Patient':  
      navigate('/patient') 
      break;  
    default:  
      navigate('/login') 
  }  
}

  return (
    <Box sx={{position: 'relative', height: '100vh'}}>
      <Box sx={{width: '100%', height: '100vh', position: 'absolute'}}>
         <img src={loginBg} alt='loginBg' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
      </Box>
      <FormPaper>
        <Typography variant='body2' sx={{textAlign: 'center'}}>Enter your email address and password to access the system</Typography>
        <form onSubmit={handleSubmit}>
            <InputField variant='outlined' 
                       type='email' 
                       name='email' 
                       label='Email'
                       value={values.email}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense" 
                       fullWidth />
                       {touched.email && errors.email &&
                          <Typography variant='body2' color='error'>{errors.email}</Typography>  
                       } 

            <InputField variant='outlined' 
                       type='password' 
                       name='password' 
                       label='Password'
                       value={values.password}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense" 
                       fullWidth />
                       {touched.password && errors.password &&
                          <Typography variant='body2' color='error'>{errors.password}</Typography>  
                       } 

            <Button type='submit' 
                    sx={{width: '100%', 
                         background: '#2e7c67', 
                         color: 'white',
                         textTransform: 'capitalize',
                         mt: '1rem'}}>
                      {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
        {!isAuthenticated && error && 
              <Typography color="error.main">
                {error}
              </Typography>}
      </FormPaper>
    </Box>
  )
}

export default Login