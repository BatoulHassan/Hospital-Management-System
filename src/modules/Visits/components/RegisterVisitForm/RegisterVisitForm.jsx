import { Box, Typography, MenuItem } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPatients } from "../../../Patients/store/slices/patientsSlice"
import {FormPaper, InputBox, InputField, 
        ButtonContainer, AddButton, TypographyError} from '../../../../Styles/Styles'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import AlertBox from '../../../../components/AlertBox/AlertBox'
import { addNewVisit, clearAddingVisitMsg } from "../../store/slice/addVisitSlice"

const RegisterVisitForm = () => {

  const patientsState = useSelector(state => state.patients)
  const {loading, error, message} = useSelector(state => state.addVisit)
  const { visits } = useSelector(state => state.visits)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPatients())
    dispatch(clearAddingVisitMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm} = useFormik({
    initialValues: {
      patient_national_id: '',
      entry_time: '',
      exit_time: '',
    },
    validationSchema: Yup.object().shape({
      patient_national_id: Yup.string().required('Required'),
      entry_time:  Yup.date()   
                      .required('Entry time is required'), 
      exit_time:   Yup.date()  
                      .required('Exit time is required')  
                      .typeError('Exit time must be a valid date')  
                      .test(  
                            'is-after-entry-time',  
                            'Exit time must be after entry time',  
                             function (value) {  
                                const { entry_time } = this.parent
                                if (!value || !entry_time) {  
                                    return true 
                                 }  
                            return new Date(value) > new Date(entry_time);  
                        }  
                      ),  
    }),
    onSubmit: (values) => {
      dispatch(addNewVisit(values))
      dispatch(clearAddingVisitMsg())
      resetForm()
    }
  })

  const handleNavigate = () => {
    navigate('/admin/visits')
  }

  return (
    <Box sx={{padding: '1rem'}}>
      {
       patientsState.loading && 
        <Typography variant='h3'>Loading...</Typography>
       }

       {
       !patientsState.loading && patientsState.patients &&
       <FormPaper>
         <PageTitle title='Add Visit:' />
         <form onSubmit={handleSubmit}>
            <InputBox>
                <InputField  select
                     required
                     label='Patient National ID'
                     name='patient_national_id'
                     value={values.patient_national_id}
                     onChange={handleChange}
                     onBlur={handleBlur}      
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                     {
                      patientsState.patients?.map(patient => (
                        <MenuItem key={patient.national_id} value={patient.national_id}>
                          {patient.user.name}
                        </MenuItem>
                      ))
                    }
                </InputField>
                {
                  visits?.find(
                                item => 
                                item.patient_national_id === values.patient_national_id
                              ) && <Typography color='error'>
                                      This patient has already registered,
                                      you can edit or delete his registeration!
                                   </Typography>
                }
                {touched.patient_national_id && errors.patient_national_id &&
                        <Typography variant='body2' 
                                    color='error' 
                                    sx={{width: {xs: '100%', sm: '50%'}}}>
                          {errors.patient_national_id}
                        </Typography>  
                }
              </InputBox>

              <InputBox>
                  <label>Entry Time</label>
                  <InputField 
                      variant='outlined' 
                      type='datetime-local' 
                      name='entry_time' 
                      value={values.entry_time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{width: {xs: '100%', sm: '50%'} }}  />

                      {touched.entry_time && errors.entry_time &&
                        <Typography variant='body2' color='error'>
                            {errors.entry_time}
                        </Typography>  
                      }
              </InputBox>

              <InputBox>
                  <label>Exit Time</label>
                  <InputField 
                      variant='outlined' 
                      type='datetime-local' 
                      name='exit_time' 
                      value={values.exit_time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{width: {xs: '100%', sm: '50%'} }}  />
                      {touched.exit_time && errors.exit_time &&
                        <Typography variant='body2' color='error'>
                            {errors.exit_time}
                        </Typography>  
                      }
                      <Typography variant='body2' 
                                  color='warning'
                                  sx={{width: {xs: '100%', sm: '50%'},
                                       marginTop: '1rem',
                                       textAlign: 'center'}}>
                        Please when you register an exit time for a patient, make sure
                        you change the status of room reserved by the patient
                      </Typography>
              </InputBox>

              <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Adding..." : "Add"}
                 </AddButton>
                 <AddButton onClick={handleNavigate}>Back to Visits</AddButton>
              </ButtonContainer>
         </form>
         {message && <AlertBox open={true} message={message} />}
           {
             error && <TypographyError variant='body2' color='error'>
                       {error}
                     </TypographyError>
           }
       </FormPaper>
       }
    </Box>
  )
}

export default RegisterVisitForm