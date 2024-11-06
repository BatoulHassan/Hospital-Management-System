import { Box, Typography, TableContainer, Paper, Table,
         TableHead, TableRow, TableCell, TableBody
       } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { StyledTableRow, ActionButton} from '../../../../Styles/Styles'
import { BoxContainer } from './style'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSchedules } from "../../../Schedules/store/slices/schedulesSlice"

const ViewDoctorSchedules = () => {

    const {id} = useParams()
    const {schedules} = useSelector(state => state.schedules)
    const schedule = schedules?.find(item => item.doctor_id === Number(id))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getSchedules())
    }, [])

  return (
    <Box sx={{p: '1rem'}}>
        <PageTitle title='Schedules:' />
        {
            !schedule ? <BoxContainer>
                           <Typography sx={{mb: '1rem', fontSize: '1.5rem'}} variant='body2'>
                               You Does not have any schedules,
                               you can add your schedules or update it from the sidebar!
                           </Typography>
                        </BoxContainer>
                      : <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 1120 }}>
                            <TableHead sx={{background: '#2e7c6747'}}>
                              <TableRow>
                                <TableCell>Schedule ID</TableCell>
                                <TableCell>Doctor ID</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <StyledTableRow key={schedule.id}>
                                <TableCell>{schedule.id}</TableCell>
                                <TableCell>{schedule.doctor_id}</TableCell>
                                <TableCell>{schedule.start_date}</TableCell>
                                <TableCell>{schedule.end_date}</TableCell>
                                <TableCell>{schedule.start_time}</TableCell>
                                <TableCell>{schedule.end_time}</TableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
        }
        <Box sx={{pt: '1rem'}}>
          <Typography sx={{color: '#6d6666', mb:'0.5rem'}} variant="body2">
            if you want to edit doctor scedules or delete ,
            you can do it from schedules table in the sidebar
          </Typography>
          <ActionButton 
                onClick={() => navigate('/admin/doctors')}>
                  Back to doctors
          </ActionButton>
        </Box>
    </Box>
  )
}

export default ViewDoctorSchedules