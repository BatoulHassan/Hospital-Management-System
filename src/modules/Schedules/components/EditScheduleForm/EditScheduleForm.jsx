import { Box, Typography, MenuItem } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { FormPaper, InputField, AddButton } from "./style"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { getDoctors } from "../../../Doctors/store/slices/viewDoctorsSlice"
import { updateSchedule, clearEdittingScheduleMsg } from "../../store/slices/editScheduleSlice"

const EditScheduleForm = () => {

  const {id} = useParams()
  const {loading, message, error} = useSelector(state => state.editSchedule)
  const doctorState = useSelector(state => state.viewDoctors)
  const {schedules} = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const schedule = schedules?.find(item => item.id === Number(id))

  useEffect(() => {
    dispatch(getDoctors())
    dispatch(clearEdittingScheduleMsg())
 }, [])

 const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
  initialValues: {
    id: schedule.id,
    doctor_id: schedule.doctor_id,
    start_date: schedule.start_date,
    end_date: schedule.end_date,
    start_time: schedule.start_time,
    end_time: schedule.end_time
  },
  validationSchema: Yup.object({
    doctor_id: Yup.string().required('Required'),
    start_date: Yup.date().required('Required').nullable(),
    end_date: Yup.date().required('Required')
                 .min(Yup.ref('start_date'), 'End date must be after start date')
                 .nullable(),
    start_time: Yup.string().required('Required'),
    end_time:  Yup.string()  
    .required('End time is required')  
    // .test('is-greater', 'End time must be after start time', function (value) {  
    // const { start_time } = this.parent;  
    // return new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${start_time}`);  
    // }),  
  }),
  onSubmit: (values) => {
      dispatch(updateSchedule(values))
  }
})

const handleNavigate = () => {
  navigate('/admin/schedules')
}

  return (
    <Box sx={{padding: '1rem'}}>
      <PageTitle title='Edit Schedule:' />
      {doctorState.loading && <Typography variant='h3'>Loading...</Typography>}
      {!doctorState.loading && doctorState.error && 
           <Typography variant='h3'>{doctorState.error}</Typography>}
      {!doctorState.loading && doctorState.doctors && 
      <FormPaper>
        <form onSubmit={handleSubmit}>
            <Box sx={{mb: '1rem'}}>
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
                {touched.doctor_id && errors.doctor_id &&
                        <Typography variant='body2' color='error'>{errors.doctor_id}</Typography>  
                }
            </Box>

            <Box sx={{mb: '1rem', display: 'flex', flexDirection: 'column'}}>
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
            </Box>

            <Box sx={{mb: '1rem', display: 'flex', flexDirection: 'column'}}>
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
            </Box>

            <Box sx={{mb: '1rem', display: 'flex', flexDirection: 'column'}}>
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
            </Box>

            <Box sx={{mb: '1rem', display: 'flex', flexDirection: 'column'}}>
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
            </Box>

            <Box sx={{display: 'flex', gap: '1rem', justifyContent: {xs: 'space-between', sm: 'unset'}}}>
                <AddButton type='submit'>
                   {loading ? "Editting..." : "Edit"}
                </AddButton>

                <AddButton onClick={handleNavigate}>Back to Doctors</AddButton>
            </Box>
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <Typography variant='body2' color='error'>{error}</Typography>}
      </FormPaper>
      }
    </Box>
  )
}

export default EditScheduleForm