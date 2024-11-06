import { Box, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { FormPaper, InputField, AddButton, ButtonContainer, 
         TypographyError } from "../../../../Styles/Styles"
import { InputTimeBox } from './style'
import { useFormik } from 'formik'
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { getDoctors } from "../../../Doctors/store/slices/viewDoctorsSlice"
import { updateSchedule, clearEdittingScheduleMsg } from "../../store/slices/editScheduleSlice"
import {EditScheduleValidation} from './EditScheduleValidation'

const EditScheduleForm = () => {

  const {id} = useParams()
  const {loading, message, error} = useSelector(state => state.editSchedule)
  const {schedules} = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const schedule = schedules?.find(item => item.id === Number(id))

  useEffect(() => {
    dispatch(getDoctors())
    dispatch(clearEdittingScheduleMsg())
 }, [])

 const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
  initialValues: {
    id: schedule.id,
    doctor_id: schedule.doctor_id,
    start_date: schedule.start_date,
    end_date: schedule.end_date,
    start_time: schedule.start_time,
    end_time: schedule.end_time
  },
  validationSchema: EditScheduleValidation,
  onSubmit: (values) => {
      dispatch(updateSchedule(values))
      resetForm()
      dispatch(clearEdittingScheduleMsg())
  }
})

const handleNavigate = () => {
  navigate('/admin/schedules')
}

  return (
    <Box sx={{padding: '1rem'}}>
      <FormPaper>
        <PageTitle title='Edit Schedule:' />
        <form onSubmit={handleSubmit}>
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
                   {loading ? "Editting..." : "Edit"}
                </AddButton>

                <AddButton onClick={handleNavigate}>Back to Schedules</AddButton>
            </ButtonContainer>
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
      </FormPaper>
    </Box>
  )
}

export default EditScheduleForm