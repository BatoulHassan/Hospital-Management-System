import PropTypes from 'prop-types'; 
import { Box, Dialog, DialogTitle, DialogContent, MenuItem, Typography } from '@mui/material'
import { ActionButton, InputField } from './style';
import { useFormik } from "formik"
import * as Yup from 'yup'; 
import { memo } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import AlertBox from '../../../../components/AlertBox/AlertBox';
import { updateRoom } from '../../../Rooms/store/slices/editRoomSlice';

const ChangeStatusDialog = ({roomTochange, open, handleCloseDialog}) => {
    
    const {loadEditting, message, error} = useSelector(state => state.editRoom)
    const dispatch = useDispatch()

    const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
      initialValues: { 
        id: roomTochange.id,
        department_id: roomTochange.department_id,
        number: roomTochange.number,
        status: roomTochange.status,
      },
      validationSchema: Yup.object({  
        status: Yup.string().required('Room status is required'),
      }),
      onSubmit: (values) => {
        console.log(values)
        dispatch(updateRoom(values))
      }, 
    })

  return (
    <>
    <Dialog
        open={open}
        onClose={handleCloseDialog}>
        <DialogTitle>Change room status</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Box sx={{mb: '1rem'}}>
                    <InputField select
                                required
                                label='Room Status'
                                name='status'
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                >
                                  <MenuItem value='vacant'>vacant</MenuItem>
                                  <MenuItem value='occupied'>occupied</MenuItem>
                                  <MenuItem value='maintenance'>maintenance</MenuItem>
                                </InputField>
                               {touched.status && errors.status &&
                                      <Typography variant='body2' color='error'>{errors.status}</Typography>  
                               }
                </Box>

                <Box sx={{display: 'flex', gap: '0.5rem'}}>
                    <ActionButton type="submit">  
                        {loadEditting ? "Changin..." : "Change"} 
                    </ActionButton>
                    <ActionButton type="submit" onClick={handleCloseDialog}>  
                        Cancel  
                    </ActionButton>
                </Box>
            </form>
            {message && <AlertBox open={true} message='Status updated successfully!' />}

            {error &&   <Typography variant='body2' color='error.main'>
                            {error}
                        </Typography>}
        </DialogContent>
    </Dialog>
    </>
  )
}

ChangeStatusDialog.propTypes = {  
    roomTochange: PropTypes.object.isRequired ,  
    open: PropTypes.bool.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
  };

export default memo(ChangeStatusDialog)