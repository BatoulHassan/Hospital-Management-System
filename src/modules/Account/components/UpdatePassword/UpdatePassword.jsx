import { Box, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { InputField, UpdateButton, ChangeButton } from "./style";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { clearMessages, editPasswordInfo } from "../../store/slices/editPasswordSlice";
import { useDispatch } from "react-redux";

const UpdatePassword = () => {

  const { successMessage, errorMessage, loading  } = useSelector(state => state.editPassword)
  const dispatch = useDispatch()

  const {values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm } = useFormik({
    initialValues: { 
      current_password: '',
      password: '',  
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required('Required'), 
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'), 
      password_confirmation: Yup.string().required('Required'), 
   }),
   onSubmit: (values) => {  
    dispatch(editPasswordInfo(values))
    resetForm()
    },
  })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
      dispatch(clearMessages())
    }

  return (
    <Box>
      <UpdateButton sx={{mb: '1rem'}} onClick={handleClickOpen}>
            Do you want to update your password?
      </UpdateButton>
      <Dialog
        open={open}
        onClose={handleClose}>
            <DialogTitle>Update your password</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <InputField variant='outlined' 
                       type='password' 
                       name='current_password' 
                       label='Current Password'
                       value={values.current_password}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense" />
                       {touched.current_password && errors.current_password &&
                          <Typography variant='body2' color='error'>{errors.current_password}</Typography>  
                       } 

                <InputField variant='outlined' 
                       type='password' 
                       name='password' 
                       label='New Password'
                       value={values.password}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense" />
                       {touched.password && errors.password &&
                          <Typography variant='body2' color='error'>{errors.password}</Typography>  
                       } 

                <InputField variant='outlined' 
                       type='password' 
                       name='password_confirmation' 
                       label='Confirm Password'
                       value={values.password_confirmation}
                       onChange={handleChange}
                       onBlur={handleBlur} 
                       size='small' 
                       margin="dense"
                       sx={{mb: '1rem'}} />
                       {touched.password_confirmation && errors.password_confirmation &&
                          <Typography variant='body2' color='error'>{errors.password_confirmation}</Typography>  
                       } 
                <Box sx={{display: 'flex', gap: '0.5rem'}}>
                  <ChangeButton type="submit">  
                    {loading ? 'Updating...' : 'Change Password'}
                  </ChangeButton>
                  <ChangeButton type="submit" onClick={handleClose}>  
                    Cancel  
                  </ChangeButton>
                </Box>
              </form>
              {successMessage && <Typography color="success.main">{successMessage}</Typography>}  
              {errorMessage && <Typography color="error.main">{errorMessage}</Typography>}
            </DialogContent>

       </Dialog>
    </Box>
  )
}

export default UpdatePassword