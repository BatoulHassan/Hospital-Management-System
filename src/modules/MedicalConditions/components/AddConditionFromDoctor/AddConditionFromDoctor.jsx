import { Box, Typography, MenuItem, FormControl, 
    OutlinedInput, FormControlLabel, Checkbox  } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { getPatients } from "../../../Patients/store/slices/patientsSlice"
import { FormPaper, ButtonContainer, AddButton, 
    InputField, InputBox, TypographyError } from '../../../../Styles/Styles'
import { SelectLabel, SelectField, InputDateBox } from './style'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { getDepartments } from "../../../Departments/store/slices/viewDepartmentsSlice"
import InputFieldBox from "../../../../components/InputFieldBox/InputFieldBox"
import { getDoctors } from "../../../Doctors/store/slices/viewDoctorsSlice"
import { getRooms } from "../../../Rooms/store/slices/viewRoomsSlice"
import { getServices } from "../../../Services/store/slices/servicesSlice"
import { addNewMedical, clearAddingMedicalMsg } from "../../store/slices/addMedicalSlice"
import AlertBox from "../../../../components/AlertBox/AlertBox"
import { updateRoom } from "../../../Rooms/store/slices/editRoomSlice"

const AddConditionFromDoctor = () => {

const {loading, error, message} = useSelector(state => state.addMedical)
const patientsState = useSelector(state => state.patients)
const departmentsState = useSelector(state => state.viewDepartments)
const doctorsState = useSelector(state => state.viewDoctors)
const roomsState = useSelector(state => state.viewRooms)
const servicesState = useSelector(state => state.services)
const surgeryDepartment = departmentsState?.departments?.find(item => item.name === 'Surgery')
console.log(surgeryDepartment)

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
   dispatch(getPatients())
   dispatch(getDepartments())
   dispatch(getDoctors())
   dispatch(getRooms())
   dispatch(getServices())
   dispatch(clearAddingMedicalMsg())
}, [])

const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue} = useFormik({
   initialValues: {  
       patient_national_id: '',
       department_id: '',
       room_id: '',
       condition_description: '',
       medications: '',
       services: [],
       follow_up: false,
       follow_up_date: '',
       surgery_required: false,
       surgery_type: '',
       surgery_date: '',
       surgery_department_id: "17",
       surgery_room_id: '',
       medical_staff: [],
     },
     validationSchema: Yup.object().shape({
       patient_national_id: Yup.string().required('Required'),
       department_id: Yup.string().required('Required'),
       room_id: Yup.string().required('Required'),
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
       surgery_department_id: Yup.string(),
       surgery_room_id: Yup.string().when("surgery_required",{
         is: true,
         then:  () => 
                      Yup.string().required("Surgery room is required!"),
         otherwise: () => Yup.string().nullable(),
       }),
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
       dispatch(addNewMedical(values))
       const occupiedRoom = roomsState.rooms.find(item => item.id === values.room_id)
       dispatch(updateRoom({...occupiedRoom, status: 'occupied'}))
       if(values.surgery_required){
         const occupiedSurgeryRoom = roomsState.rooms.find(item => item.id === values.surgery_room_id)
         dispatch(updateRoom({...occupiedSurgeryRoom, status: 'occupied'}))
       }
       dispatch(clearAddingMedicalMsg())
   }
})

const handleNavigate = () => {
    navigate('/doctor/medicalConditions')
}

return (
<Box sx={{padding: '1rem'}}>
   {
     patientsState.loading && 
       departmentsState.loading &&
        doctorsState.loading &&
         roomsState.loading &&
          servicesState.loading &&
          <Typography variant='h3'>Loading...</Typography>
   }

   {
     !patientsState.loading && patientsState.patients && 
       !departmentsState.loading && departmentsState.departments &&
           !roomsState.loading && roomsState.rooms &&
            !doctorsState.loading && doctorsState.doctors &&
             !servicesState.loading && servicesState.services &&
     <FormPaper>
       <PageTitle title='Add Medical Condition:' />
       <form onSubmit={handleSubmit}>
         <InputBox>
           <InputField  
                select
                required
                label='National ID'
                name='patient_national_id'
                value={values.patient_national_id}
                onChange={handleChange}
                onBlur={handleBlur}      
                sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                    {
                 patientsState?.patients?.map(patient => (
                   <MenuItem key={patient.national_id} value={patient.national_id}>
                     {patient.user.name}
                   </MenuItem>
                 ))
               }
           </InputField>
           {touched.patient_national_id && errors.patient_national_id &&
                 <Typography variant='body2' color='error'>{errors.patient_national_id}</Typography>  
             }
         </InputBox>

         <InputBox>
           <InputField  
                select
                required
                label='Deprtment ID'
                name='department_id'
                value={values.department_id}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                {
                 departmentsState?.departments?.map(department => (
                   <MenuItem key={department.id} value={department.id}>
                     {department.name}
                   </MenuItem>
                 ))
               }
             </InputField>
             {touched.department_id && errors.department_id &&
                 <Typography variant='body2' color='error'>{errors.department_id}</Typography>  
             }
         </InputBox>
           {
            values.department_id && 
           <InputBox>
             <InputField  
                select
                required
                label='Room ID'
                name='room_id'
                value={values.room_id}
                onChange={handleChange}
                onBlur={handleBlur}      
                sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                {
                   departmentsState.departments
                                   .find(item => item.id === values.department_id)
                                   .rooms.filter(item => item.status === 'vacant')
                                   .map(vacantRoom => (
                                       <MenuItem key={vacantRoom.id} value={vacantRoom.id}>
                                          {vacantRoom.number}
                                       </MenuItem>
                                   ))
               }
             </InputField>
             {touched.room_id && errors.room_id &&
                 <Typography variant='body2' color='error'>{errors.room_id}</Typography>  
             }
           </InputBox>
          }

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
                   <InputField  
                      select
                      required
                      label='Surgery Room ID'
                      name='surgery_room_id'
                      value={values.surgery_room_id}
                      onChange={handleChange}
                      onBlur={handleBlur}      
                      sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                      {
                         surgeryDepartment
                               .rooms
                               .filter(item => item.status === 'vacant')
                               .map(vacantRoom => (
                                 <MenuItem key={vacantRoom.id} value={vacantRoom.id}>
                                     {vacantRoom.number}
                                 </MenuItem>
                               ))
                       }
                   </InputField>
                    {touched.surgery_room_id && errors.surgery_room_id &&
                      <Typography variant='body2' color='error'>
                         {errors.surgery_room_id}
                      </Typography>  
                     }
                 </InputBox>

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
               {loading ? 'Adding...' : 'Add'}
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

export default AddConditionFromDoctor