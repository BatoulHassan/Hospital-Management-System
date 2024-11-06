import { Box, Dialog, DialogTitle, DialogContent, Typography  } from '@mui/material';
import { InputField } from '../../../../Styles/Styles'
import { InputDateBox, ShiftButton } from './style'
import PropTypes from 'prop-types'; 
import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { updateMedicalCondition } from '../../store/slices/editMedicalSlice';
import * as Yup from 'yup'

const ShiftSurgery = ({itemToChange,open,handleCloseShiftDialog,refresh}) => {

   const { loading, error, message } = useSelector(state => state.editMedical)

  const dispatch = useDispatch()

  const formattedDate = (surgeryDate) => {
    const date = new Date(surgeryDate)
    return date.toISOString().slice(0, 16)
  } 

  const { values, handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({
    initialValues:{
      id: itemToChange.id,
      patient_national_id: itemToChange.patient_national_id,
      department_id: itemToChange.department_id,
      doctor_id: itemToChange.doctor_id,
      room_id: itemToChange.room_id,
      condition_description: itemToChange.condition_description,
      medications: itemToChange.medications,
      services: itemToChange.services.map(item => item.id),
      follow_up: itemToChange.follow_up,
      follow_up_date: itemToChange.follow_up_date,
      surgery_required: itemToChange.surgery_required,
      surgery_type: itemToChange.surgery.surgery_type,
      surgery_date: formattedDate(itemToChange.surgery.surgery_date),
      surgery_department_id: itemToChange.surgery.department_id,
      surgery_room_id: itemToChange.surgery.room_id,
      medical_staff: itemToChange.surgery.medical_staff.map(item => item)
    },
    validationSchema: Yup.object({  
      surgery_date: Yup.date()  
        .required('Surgery date is required')  
        .typeError('Please enter a valid date'),  
    }),  
    onSubmit: (values) => {
      console.log(values)
      dispatch(updateMedicalCondition(values))
      .then(() => {  
        refresh()
      })
     }
  })

  return (
    <>
      <Dialog
        open={open}>
          <DialogTitle>Shift the surgery date</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
              <InputDateBox>
                <label>Surgery Date</label>
                 <InputField 
                    variant='outlined' 
                    type='datetime-local' 
                    name='surgery_date' 
                    value={values.surgery_date}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {touched.surgery_date && errors.surgery_date &&
                        <Typography variant='body2' color='error'>
                            {errors.surgery_date}
                         </Typography>  
                     }
                </InputDateBox>  
                <Box sx={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                  <ShiftButton type="submit">  
                     {loading ? "Shifting" : "Shift"}
                  </ShiftButton>
                  <ShiftButton type="submit" onClick={handleCloseShiftDialog}>  
                    Cancel  
                  </ShiftButton>
                </Box>
              </form> 
            {message && <Typography color="success.main">{message}</Typography>}  
            {error && <Typography color="error.main">{error}</Typography>}
          </DialogContent>
        </Dialog>
    </>
  )
}

ShiftSurgery.propTypes = {  
  // surgery_required: PropTypes.number.isRequired,
  itemToChange: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseShiftDialog: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default memo(ShiftSurgery)