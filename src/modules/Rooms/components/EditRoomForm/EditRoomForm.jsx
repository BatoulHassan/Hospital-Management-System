import { Box, MenuItem, Typography } from "@mui/material"
import { AddButton, FormPaper, InputField, InputBox, 
         ButtonContainer, TypographyError } from "../../../../Styles/Styles"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getDepartments } from "../../../Departments/store/slices/viewDepartmentsSlice"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from 'yup'; 
import { useFormik } from "formik"
import { clearEdittingMessage, updateRoom } from "../../store/slices/editRoomSlice"
import AlertBox from "../../../../components/AlertBox/AlertBox"
import PageTitle from "../../../../components/PageTitle/PageTitle"

const EditRoomForm = () => {

    const {id} = useParams()
    const {departments, loading} = useSelector(state => state.viewDepartments)
    const {rooms} = useSelector(state => state.viewRooms)
    const {message, loadEditting, error} = useSelector(state => state.editRoom)
    
    const room = rooms?.find(item => item.id === Number(id))
    const filteredRooms = rooms.filter(item => item.id !== Number(id))
    const existingRoomNumbers = filteredRooms.map(item => item.number)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDepartments())
        dispatch(clearEdittingMessage())
      }, [])

      const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
        initialValues: { 
          id: room.id,
          department_id: room.department_id,
          number: room.number,
          status: room.status,
        },
        validationSchema: Yup.object({  
          department_id: Yup.string().required('Department is required'),
          number:  Yup.string().required('Room number is required')
          .test('is-unique', 'Room number must be unique', value => {  
          return !existingRoomNumbers.includes(value)
}),
          status: Yup.string().required('Room status is required'),
        }),
        onSubmit: (values) => {
          dispatch(updateRoom(values))
          dispatch(clearEdittingMessage())
        }, 
      })

      const handleNavigate = () => {
        navigate('/admin/rooms')
      }

  return (
    <Box sx={{p: '1rem'}}>
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && departments && 
        <FormPaper>
          <PageTitle title="Edit Room:" />
          <form onSubmit={handleSubmit}>
            <InputBox>
                <InputField  
                     select
                     required
                     label='Department'
                     name='department_id'
                     value={values.department_id}
                     onChange={handleChange}
                     onBlur={handleBlur}      
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                    {
                      departments?.map(department => (
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

            <InputBox>
                <InputField variant='outlined' 
                    type='text'
                    name= 'number'
                    label='Room Number'
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{width: {xs: '100%', sm: '50%'}}}  />
                    {touched.number && errors.number &&
                        <Typography variant='body2' color='error'>{errors.number}</Typography>  
                     }
            </InputBox>

            <InputBox>
                <InputField select
                     required
                     label='Room Status'
                     name='status'
                     value={values.status}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     sx={{width: {xs: '100%', sm: '50%'}, display: 'flex'}}>
                  <MenuItem value='vacant'>vacant</MenuItem>
                  <MenuItem value='occupied'>occupied</MenuItem>
                  <MenuItem value='maintenance'>maintenance</MenuItem>
                </InputField>
                {touched.status && errors.status &&
                  <Typography variant='body2' color='error'>{errors.status}</Typography>  
                }
            </InputBox>

            <ButtonContainer>
             <AddButton type='submit'>
              {loadEditting ? "Editting..." : "Edit"}
             </AddButton>
             <AddButton onClick={handleNavigate}>Back to rooms</AddButton>
          </ButtonContainer>
          
          </form>
          {message && <AlertBox open={true} message={message} />}
          {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
        </FormPaper>
      }
    </Box>
  )
}

export default EditRoomForm