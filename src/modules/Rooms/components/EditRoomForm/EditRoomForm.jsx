import { Box, MenuItem, Typography } from "@mui/material"
import { AddButton, FormPaper, InputField } from "./style"
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

    const {departments, loading} = useSelector(state => state.viewDepartments)
    const {rooms} = useSelector(state => state.viewRooms)
    const {message, loadEditting, error} = useSelector(state => state.editRoom)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const room = rooms?.find(item => item.id === Number(id))

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
          number: Yup.number().required('Room number is required'),
          status: Yup.string().required('Room status is required'),
        }),
        onSubmit: (values) => {
          dispatch(updateRoom(values))
        }, 
      })

      const handleNavigate = () => {
        navigate('/admin/rooms')
      }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title="Edit Room:" />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && departments && 
        <FormPaper>
          <form onSubmit={handleSubmit}>
            <Box sx={{mb: '1rem'}}>
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
            </Box>

            <Box sx={{mb: '1rem'}}>
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
            </Box>

            <Box sx={{mb: '1rem'}}>
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
            </Box>

            <Box sx={{display: 'flex', 
                    gap: '0.5rem', 
                    justifyContent: {xs: 'space-between', sm: 'unset'}}}>
             <AddButton type='submit'>
              {loadEditting ? "Editting..." : "Edit"}
             </AddButton>
             <AddButton onClick={handleNavigate}>Back to rooms</AddButton>
          </Box>
          
          </form>
          {message && <AlertBox open={true} message={message} />}
          {error && <Typography variant='body2' color='error'>{error}</Typography>}
        </FormPaper>
      }
    </Box>
  )
}

export default EditRoomForm