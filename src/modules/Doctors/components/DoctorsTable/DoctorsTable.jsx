import { Box, Typography, TableContainer, Paper,
         Table, TableHead, TableRow, TableCell,
         TableBody, Avatar, Snackbar, Alert } from "@mui/material"
import { StyledTableRow, ActionButton } from "../../../../Styles/Styles"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, memo } from 'react'
import { getDoctors } from '../../store/slices/viewDoctorsSlice'
import { useNavigate } from 'react-router-dom'
import { deleteDoctorItem, clearDeleteDoctorMsg } from "../../store/slices/deleteDoctorSlice"
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"
import PropTypes from 'prop-types'; 

const DoctorsTable = ({showActions}) => {

   const {loading, error, doctors} = useSelector(state => state.viewDoctors)
   const deleteState = useSelector(state => state.deleteDoctor)
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
      dispatch(deleteDoctorItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getDoctors())
      })
      .catch((error) => {  
        console.error("Failed to delete doctor:", error);  
      })
    }

  useEffect(() => {
    dispatch(getDoctors())
    dispatch(clearDeleteDoctorMsg())
  }, [])

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Doctors:' />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h3'>{error}</Typography>}
      {!loading && doctors ? 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1120 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {doctors?.map(doctor => (
              <StyledTableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>
                   <Avatar alt={doctor.user.name} 
                           src={`https://pk.jamous-tech.com/storage/${doctor.user.avatar}`} 
                           sx={{ width: 56, height: 56 }}/>   
                </TableCell>
                <TableCell>{doctor.user.name}</TableCell>
                <TableCell>{doctor.user.email}</TableCell>
                <TableCell>{doctor.department.name}</TableCell>
                <TableCell>{doctor.specialization.name}</TableCell>
                <TableCell>
                   <ActionButton sx={{mr: '0.5rem'}}
                                 onClick={() => navigate(`viewSchedules/${doctor.id}`)}>
                                  Schedules
                   </ActionButton>
                   {
                    showActions && <>
                                     <ActionButton sx={{mr: '0.5rem'}}
                                                   onClick={() => navigate(`editDoctor/${doctor.id}`)}>
                                        Edit
                                     </ActionButton>
                                     <ActionButton onClick={() => handleDeleteClick(doctor.id)}>
                                      Delete
                                     </ActionButton>
                                   </>
                   }
                   
                </TableCell>
              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        : 
              !loading && !error && !doctors.length ? <Typography variant='h3'>
                                                         No doctors added
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

DoctorsTable.propTypes = {  
  showActions: PropTypes.bool,
};

export default memo(DoctorsTable)