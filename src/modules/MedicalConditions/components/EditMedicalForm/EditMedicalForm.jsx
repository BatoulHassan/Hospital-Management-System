import { Box, Typography, MenuItem, FormControl, 
         OutlinedInput, FormControlLabel, Checkbox  } from "@mui/material"
import { SelectField, SelectLabel, InputDateBox } from './style'
import { FormPaper, ButtonContainer, AddButton, 
         InputBox, InputField, TypographyError } from '../../../../Styles/Styles'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useParams, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { getDoctors } from "../../../Doctors/store/slices/viewDoctorsSlice"
import InputFieldBox from "../../../../components/InputFieldBox/InputFieldBox"
import { getServices } from "../../../Services/store/slices/servicesSlice"
import { clearEdittingMedicalMsg, updateMedicalCondition } from "../../store/slices/editMedicalSlice"
import AlertBox from "../../../../components/AlertBox/AlertBox"

const EditMedicalForm = () => {

    const {id} = useParams()
    const {medicalConditions} = useSelector(state => state.medicalConditions)
    const medicalCondition = medicalConditions.find(item => item.id === Number(id))
    console.log(medicalCondition)

    const formattedDate = (surgeryDate) => {
      const date = new Date(surgeryDate)
      return date.toISOString().slice(0, 16)
    } 
 
    const departmentsState = useSelector(state => state.viewDepartments)
    const doctorsState = useSelector(state => state.viewDoctors)
    const servicesState = useSelector(state => state.services)
    const {roles} = useSelector(state => state.auth)
    const surgeryDepartment = departmentsState?.departments?.find(item => item.name === 'Surgery')

    const surgeryRooms = surgeryDepartment?.rooms?.filter(item => item.status === 'vacant')
    const surgeryType = medicalCondition.surgery !== null
                                                          ? medicalCondition.surgery.surgery_type
                                                          : "No surgery required"

    const surgeryDate = medicalCondition.surgery !== null
                                                          ? formattedDate(medicalCondition.surgery.surgery_date)
                                                          : "2024-11-29T19:18"

    const surgeryDepartmentId =  medicalCondition.surgery !== null
                                                          ? medicalCondition.surgery.department_id
                                                          : 17
                                                          
    const surgeryRoomId = medicalCondition.surgery !== null
                                                          ? medicalCondition.surgery.room_id
                                                          : surgeryRooms[0].id

    const medicalStaff = medicalCondition.surgery !== null
                                                          ? medicalCondition.surgery.medical_staff.map(item => item)
                                                          : []  

    const { loading, error, message } = useSelector(state => state.editMedical)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigate = () => {
      if(roles === 'admin'){
      navigate('/admin/medicalConditions')
      }else if(roles === 'doctor'){
        navigate('/doctor/medicalConditions')
      }
    }

    useEffect(() => {
      dispatch(getDoctors())
      dispatch(getServices())
      dispatch(clearEdittingMedicalMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue} = useFormik({
    initialValues: {
      id: medicalCondition.id,
      patient_national_id: medicalCondition.patient_national_id,
      department_id: medicalCondition.department_id,
      doctor_id: medicalCondition.doctor_id,
      room_id: medicalCondition.room_id,
      condition_description: medicalCondition.condition_description,
      medications: medicalCondition.medications,
      services: medicalCondition.services.map(item => item.id),
      follow_up: medicalCondition.follow_up,
      follow_up_date: medicalCondition.follow_up_date,
      surgery_required: medicalCondition.surgery_required,
      surgery_type: surgeryType,
      surgery_date: surgeryDate,
      surgery_department_id: surgeryDepartmentId,
      surgery_room_id: surgeryRoomId,
      medical_staff: medicalStaff
    },
    validationSchema: Yup.object().shape({
      condition_description: Yup.string().required('Required'),
      medications: Yup.string().required('Required'),
      services: Yup.array().of(Yup.string()
                         .required('Services is required'))
                         .min(1, 'At least one service is required')  
                         .required('Services are required'),
      follow_up: Yup.boolean(),
      follow_up_date: Yup.string().when("follow_up",{
        is: true,
        then:  () => 
          Yup.string().required("Follow up date is required!"),
        otherwise: () => Yup.string().nullable(),
      }),
      surgery_required: Yup.boolean(),
      surgery_type: Yup.string().when("surgery_required",{
        is: true,
        then:  () => 
                     Yup.string().required("Surgery type is required!"),
        otherwise: () => Yup.string().nullable(),
      }),
      surgery_date: Yup.string().when("surgery_required",{
        is: true,
        then:  () => 
                     Yup.string().required("Surgery date is required!"),
        otherwise: () => Yup.string().nullable(),
      }),
      surgery_department_id: Yup.string().nullable(),
      surgery_room_id: Yup.string().nullable(),
      medical_staff: Yup.array().when("surgery_required",{
        is: true,
        then:  () => 
                     Yup.array()
                        .of(Yup.string().required('Medical staff is required'))
                        .min(1, 'At least one medical staff is required'), 
        otherwise: () => Yup.array().nullable(),
      }),
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(updateMedicalCondition(values))
      dispatch(clearEdittingMedicalMsg())
    }
  })

  return (
    <Box sx={{padding: '1rem'}}>
      {
          doctorsState.loading &&
            servicesState.loading &&
          <Typography variant='h3'>Loading...</Typography>
      }

      {
          !doctorsState.loading && doctorsState.doctors &&
              !servicesState.loading && servicesState.services &&
        <FormPaper>
          <PageTitle title='Edit Medical Condition:' />
          <form onSubmit={handleSubmit}>
                <InputFieldBox 
                    type='text' 
                    name='condition_description' 
                    label='Condition Description' 
                    value={values.condition_description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.condition_description}
                    errors={errors.condition_description} />

                <InputFieldBox 
                    type='text' 
                    name='medications' 
                    label='Medications' 
                    value={values.medications}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.medications}
                    errors={errors.medications} />

                <InputBox>
                  <FormControl sx={{width: {xs: '100%', sm: '50%'}}}>
                  <SelectLabel id="demo-multiple-checkbox-label">Services</SelectLabel>
                  <SelectField
                     labelId="demo-multiple-checkbox-label"
                     id="demo-multiple-checkbox"
                     multiple
                     name='services'
                     value={values.services}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     input={<OutlinedInput label="Services" />}
                     renderValue={(selected) => selected.join(',')}>
                     {
                      servicesState.services?.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                            {service.name}
                        </MenuItem>
                      ))
                     }
                  </SelectField>
                  {touched.services && errors.services &&
                      <Typography sx={{display: 'flex', justifyContent: 'center'}}
                                  variant='body2' color='error'>
                                    {errors.services}
                      </Typography>  
                  }
                </FormControl>
              </InputBox>

              <InputBox>
                    <FormControlLabel 
                     control={  
                      <Checkbox  
                        name="follow_up"  
                        checked={values.follow_up} 
                        onChange={(event) => { 
                          const checked = event.target.checked;  
                          setFieldValue('follow_up', checked);  
                          if (!checked) setFieldValue('follow_up_date', null);  
                        }}
                        onBlur={handleBlur}  
                      />  
                    }  
                    label="Follow up"  
                    />
                     {touched.follow_up && errors.follow_up &&
                      <Typography variant='body2' color='error'>{errors.follow_up}</Typography>  
                     }  
                </InputBox>

                {values.follow_up ? 
                      <InputDateBox>
                          <label>Follow Up Date</label>
                          <InputField 
                            variant='outlined' 
                            type='datetime-local' 
                            name='follow_up_date' 
                            value={values.follow_up_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{width: {xs: '100%', sm: '50%'} }}  />
                            {touched.follow_up_date && errors.follow_up_date &&
                               <Typography variant='body2' color='error'>
                                  {errors.follow_up_date}
                               </Typography>  
                            }
                      </InputDateBox> 
                      : null
                    }

                <InputBox>
                    <FormControlLabel 
                     control={  
                      <Checkbox  
                        name="surgery_required"  
                        checked={values.surgery_required} 
                        onChange={(event) => { 
                          const checked = event.target.checked;  
                          setFieldValue('surgery_required', checked);  
                          if (!checked){
                            setFieldValue('surgery_type', null)
                            setFieldValue('surgery_date', null)
                            setFieldValue('surgery_department_id', null) 
                            setFieldValue('surgery_room_id', null)
                            setFieldValue('medical_staff', null)
                          }  
                        }}
                        onBlur={handleBlur}  
                      />  
                    }  
                    label="Surgery Required"  
                    />
                     {touched.surgery_required && errors.surgery_required &&
                      <Typography variant='body2' color='error'>{errors.surgery_required}</Typography>  
                     }  
                </InputBox>

                {values.surgery_required ? 
                    <>
                      <InputDateBox>
                          <InputField 
                            variant='outlined' 
                            type='text' 
                            name='surgery_type' 
                            label= 'Surgery Type'
                            value={values.surgery_type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{width: {xs: '100%', sm: '50%'} }}  />
                            {touched.surgery_type && errors.surgery_type &&
                               <Typography variant='body2' color='error'>
                                  {errors.surgery_type}
                               </Typography>  
                            }
                      </InputDateBox>

                      <InputDateBox>
                          <label>Surgery Date</label>
                          <InputField 
                            variant='outlined' 
                            type='datetime-local' 
                            name='surgery_date' 
                            value={values.surgery_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{width: {xs: '100%', sm: '50%'} }}  />
                            {touched.surgery_date && errors.surgery_date &&
                               <Typography variant='body2' color='error'>
                                  {errors.surgery_date}
                               </Typography>  
                            }
                      </InputDateBox>

                       <InputBox>
                        <FormControl sx={{width: {xs: '100%', sm: '50%'}}}>
                          <SelectLabel id="demo-multiple-checkbox-label">Medical Staff</SelectLabel>
                            <SelectField
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                name='medical_staff'
                                value={values.medical_staff}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                input={<OutlinedInput label="Services" />}
                                renderValue={(selected) => selected.join(',')}>
                                {
                                  doctorsState.doctors?.map(doctor => (
                                     <MenuItem key={doctor.id} value={doctor.id}>
                                        {doctor.user.name}
                                     </MenuItem>
                                     ))
                                }
                              </SelectField>
                               {touched.medical_staff && errors.medical_staff &&
                                  <Typography sx={{display: 'flex', justifyContent: 'center'}}
                                              variant='body2' color='error'>
                                    {errors.medical_staff}
                                  </Typography>  
                                }
                        </FormControl>
                      </InputBox>
                    </>
                    : null
                  }

              <ButtonContainer>
                 <AddButton type='submit' sx={{width: '88px'}}>
                    {loading ? "Editting" : "Edit"}
                 </AddButton>
                 <AddButton onClick={handleNavigate}>Back to medical conditions</AddButton>
              </ButtonContainer>
          </form>
          {message && <AlertBox open={true} message={message} />}
            {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
        </FormPaper>
      }
    </Box>
  )
}

export default EditMedicalForm