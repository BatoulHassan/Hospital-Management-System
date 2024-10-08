import loginBg from '../../assets/loginBg.jpg'
import {Box, Button,Typography} from '@mui/material'
import { FormPaper, InputField } from './LoginStyle'

const Login = () => {
  return (
    <Box sx={{position: 'relative', height: '100vh'}}>
      <Box sx={{width: '100%', height: '100vh', position: 'absolute'}}>
         <img src={loginBg} alt='loginBg' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
      </Box>
      <FormPaper>
        <Typography variant='body2' sx={{textAlign: 'center'}}>Enter your email address and password to access the system</Typography>
        <form>
            <InputField variant='outlined' 
                       type='email' 
                       name='email' 
                       label='Email'
                       size='small' 
                       margin="dense" 
                       fullWidth />

            <InputField variant='outlined' 
                       type='passowrd' 
                       name='password' 
                       label='Password'
                       size='small' 
                       margin="dense" 
                       fullWidth />

            <Button type='submit' 
                    sx={{width: '100%', 
                         background: '#2e7c67', 
                         color: 'white',
                         mt: '1rem'}}>
                          Login
            </Button>
        </form>
      </FormPaper>
    </Box>
  )
}

export default Login