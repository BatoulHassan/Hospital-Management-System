import { Box, Typography, TableContainer, Paper, 
         Table, TableHead, TableRow, TableCell,
         TableBody, Snackbar, Alert } from '@mui/material'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getSchedules } from '../../store/slices/schedulesSlice'
import { StyledTableRow, ActionButton } from '../../../../Styles/Styles'
import { useNavigate } from 'react-router-dom'
import { deleteScheduleItem, clearScheduleMsg } from '../../store/slices/deleteScheduleSlice'
import DeleteDialog from '../../../../components/DeleteDialog/DeleteDialog'

const SchedulesTable = () => {

  const {schedules, loading, error} = useSelector(state => state.schedules)
  const deleteState = useSelector(state => state.deleteSchedule)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSnackbarClose = () => {  
    setOpenSnackbar(false);  
  }

  const handleDeleteClick = (id) => {  
    setIdToDelete(id);  
    setOpenDialog(true);  
  }

  const handleDialogClose = () => {  
    setOpenDialog(false);  
    setIdToDelete(null);  
  }

  const handleConfirmDelete = () => {
    dispatch(deleteScheduleItem(idToDelete))
    .then(() => {  
      setOpenSnackbar(true) 
      dispatch(getSchedules());
      
    })
    .catch((error) => {  
      console.error("Failed to delete schedule:", error);  
    })
  }
  
  useEffect(() => {
     dispatch(getSchedules())
     dispatch(clearScheduleMsg())
  }, [])

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Schedules:' />
        {loading && <Typography variant='h3'>Loading...</Typography>}
        {!loading && error && <Typography variant='h3'>{error}</Typography>}
        {!loading && schedules.length ? 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1120 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                <TableCell>Schedule ID</TableCell>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules?.map(schedule => (
              <StyledTableRow key={schedule.id}>
                 <TableCell>{schedule.id}</TableCell>
                 <TableCell>{schedule.doctor_id}</TableCell>
                 <TableCell>{schedule.start_date}</TableCell>
                 <TableCell>{schedule.end_date}</TableCell>
                 <TableCell>{schedule.start_time}</TableCell>
                 <TableCell>{schedule.end_time}</TableCell>
                 <TableCell>
                   <ActionButton sx={{mr: '0.5rem'}} 
                                 onClick={() => navigate(`editSchedule/${schedule.id}`)}>
                                 Edit
                   </ActionButton>
                   <ActionButton onClick={() => handleDeleteClick(schedule.id)}>Delete</ActionButton>
                 </TableCell>
              </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : 
            !loading && !error && !schedules.length ? <Typography variant='h3'>
                                                         No schedules added
                                                      </Typography>
                                                    : null
        }

        {idToDelete && <DeleteDialog 
                         openDialog={openDialog}
                         handleDialogClose={handleDialogClose}
                         handleConfirmDelete={handleConfirmDelete}
                         openSnackbar={openSnackbar}
                         handleSnackbarClose={handleSnackbarClose}/>}

        {deleteState.message &&  
                   <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openSnackbar}  
                        onClose={handleSnackbarClose}   
                        autoHideDuration={3000}>
                        <Alert onClose={handleSnackbarClose} severity="success">  
                          {deleteState.message}
                        </Alert> 
                    </Snackbar> }

        {deleteState.error &&    
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openSnackbar}  
                        onClose={handleSnackbarClose}   
                        autoHideDuration={3000}>
                        <Alert onClose={handleSnackbarClose} severity="error">  
                          {deleteState.error}
                        </Alert> 
                     </Snackbar> }
    </Box>
  )
}

export default SchedulesTable