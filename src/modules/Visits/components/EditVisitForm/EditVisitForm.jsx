import { Box, Typography } from '@mui/material'
import { FormPaper, InputBox, InputField, 
         ButtonContainer, AddButton, TypographyError } from '../../../../Styles/Styles'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { clearEdittingVisitMsg, updateVisit } from '../../store/slice/editVisitSlice'
import { useEffect } from 'react'
import * as Yup from 'yup'
import AlertBox from '../../../../components/AlertBox/AlertBox'

const EditVisitForm = () => {

  const {id} = useParams()
  const {visits} = useSelector(state => state.visits)
  const {loading, error, message} = useSelector(state => state.editVisit)
  const visit = visits.find(item => item.id === Number(id))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearEdittingVisitMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues:{
      id: visit.id,
      patient_national_id: visit.patient_national_id,
      entry_time: visit.entry_time,
      exit_time: visit.exit_time
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
      dispatch(updateVisit(values))
      dispatch(clearEdittingVisitMsg())
    }
  })

  const handleNavigate = () => {
    navigate('/admin/visits')
  }

  return (
    <Box sx={{padding: '1rem'}}>
      <FormPaper>
        <PageTitle title='Edit Visit:' />
        <form onSubmit={handleSubmit}>
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
            </InputBox>

            <ButtonContainer>
                 <AddButton type='submit'>
                   {loading ? "Editting..." : "Edit"}
                 </AddButton>
                 <AddButton onClick={handleNavigate}>Back to Visits</AddButton>
            </ButtonContainer>
        </form>
        {message && <AlertBox open={true} message={message} />}
        {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
      </FormPaper>
    </Box>
  )
}

export default EditVisitForm