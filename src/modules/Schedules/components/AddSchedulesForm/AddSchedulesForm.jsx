import { Box, Typography, MenuItem } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { FormPaper, InputField, InputBox, AddButton, 
         ButtonContainer, TypographyError } from '../../../../Styles/Styles'
import { InputTimeBox } from './style'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getDoctors } from "../../../Doctors/store/slices/viewDoctorsSlice"
import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { addNewSchedule, clearAddingScheduleMsg } from '../../store/slices/addScheduleSlice'
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { AddScheduleValidation } from "./AddScheduleValidation"

const AddSchedulesForm = () => {

  const doctorState = useSelector(state => state.viewDoctors)
  const { loading, message, error } = useSelector(state => state.addSchedule)
  const {schedules} = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDoctors())
    dispatch(clearAddingScheduleMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      doctor_id: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: ''
    },
    validationSchema: AddScheduleValidation,
    onSubmit: (values) => {
      dispatch(addNewSchedule(values))
      resetForm()
      dispatch(clearAddingScheduleMsg())
    }
  })

  const handleNavigate = () => {
    navigate('/admin/schedules')
  }

  return (
    <Box sx={{padding: '1rem'}}>
      {doctorState.loading && <Typography variant='h3'>Loading...</Typography>}
      {!doctorState.loading && doctorState.error && 
           <Typography variant='h3'>{doctorState.error}</Typography>}
      {!doctorState.loading && doctorState.doctors && 
      <FormPaper>
        <PageTitle title='Add Schedule:' />
        <form onSubmit={handleSubmit}>
            <InputBox>
                <InputField  select
                     required
                     label='Doctor'
                     name='doctor_id'
                     value={values.doctor_id}
                     onChange={handleChange}
                     onBlur={handleBlur}      
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                     {
                      doctorState.doctors?.map(doctor => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          {doctor.user.name}
                        </MenuItem>
                      ))
                    }
                </InputField>
                {
                 schedules?.find(item => item.doctor_id === values.doctor_id) && 
                        <Typography color='error'>
                                           This doctor has already schedules,
                                           you can edit or delete it!
                        </Typography>
                }
                {touched.doctor_id && errors.doctor_id &&
                        <Typography variant='body2' color='error'>{errors.doctor_id}</Typography>  
                }
            </InputBox>
            
            <InputTimeBox>
              <label>Start Date</label>
              <InputField variant='outlined' 
                     type='date' 
                     name='start_date' 
                     value={values.start_date}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.start_date && errors.start_date &&
                          <Typography variant='body2' color='error'>{errors.start_date}</Typography>  
                     }
            </InputTimeBox>

            <InputTimeBox>
              <label>End Date</label>
              <InputField variant='outlined' 
                     type='date' 
                     name='end_date' 
                     value={values.end_date}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.end_date && errors.end_date &&
                          <Typography variant='body2' color='error'>{errors.end_date}</Typography>  
                     }
            </InputTimeBox>

            <InputTimeBox>
              <label>Start time</label>
              <InputField variant='outlined' 
                     type='time' 
                     name='start_time' 
                     value={values.start_time}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.start_time && errors.start_time &&
                          <Typography variant='body2' color='error'>{errors.start_time}</Typography>  
                     }
            </InputTimeBox>

            <InputTimeBox>
              <label>End time</label>
              <InputField variant='outlined' 
                     type='time' 
                     name='end_time' 
                     value={values.end_time}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.end_time && errors.end_time &&
                          <Typography variant='body2' color='error'>{errors.end_time}</Typography>  
                     }
            </InputTimeBox>

            <ButtonContainer>
                <AddButton type='submit'>
                   {loading ? "Adding..." : "Add"}
                </AddButton>

                <AddButton onClick={handleNavigate}>Back to schedules</AddButton>
            </ButtonContainer>
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
      </FormPaper>
      }
    </Box>
  )
}

export default AddSchedulesForm