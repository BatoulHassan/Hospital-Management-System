import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPatients } from "../../store/slices/patientsSlice"
import { Box, Typography, TableContainer, Paper,Table,
     TableHead, TableRow, TableCell, TableBody, Avatar,
     Snackbar, Alert } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { StyledTableRow, ActionButton } from "./style"
import { useNavigate } from "react-router-dom"
import { deletePatientItem, clearPatientMsg } from '../../store/slices/deletePatientSlice'
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"

const PatientsTable = () => {

    const {patients, loading, error} = useSelector(state => state.patients)
    const deleteState = useSelector(state => state.deletePatient)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPatients())
        dispatch(clearPatientMsg())
    }, [])

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
        dispatch(deletePatientItem(idToDelete))
        .then(() => {  
          setOpenSnackbar(true) 
          dispatch(getPatients());
        })
        .catch((error) => {  
          console.error("Failed to delete patient:", error) 
        })
      }


  return (
    <Box sx={{p: '1rem'}}>
        <PageTitle title='Patients:' />
        {loading && <Typography variant='h3'>Loading...</Typography>}
        {!loading && error && <Typography variant='h3'>{error}</Typography>}
        {!loading && patients && 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1120 }}>
              <TableHead sx={{background: '#2e7c6747'}}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>National ID</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients?.map(patient => (
                    <StyledTableRow key={patient.id}>
                        <TableCell>{patient.id}</TableCell>
                        <TableCell>
                           <Avatar alt={patient.user.name} 
                                   src={`https://pk.jamous-tech.com/storage/${patient.user.avatar}`} 
                                   sx={{ width: 56, height: 56 }}/>   
                        </TableCell>
                        <TableCell>{patient.user.name}</TableCell>
                        <TableCell>{patient.user.email}</TableCell>
                        <TableCell>{patient.national_id}</TableCell>
                        <TableCell>{patient.mobile_number}</TableCell>
                        <TableCell>{patient.residence_address}</TableCell>
                        <TableCell>
                        <ActionButton sx={{mr: '0.5rem'}}
                                 onClick={() => navigate(`editPatient/${patient.id}`)}>
                                  Edit
                        </ActionButton>
                        <ActionButton onClick={() => handleDeleteClick(patient.id)}>Delete</ActionButton>
                </TableCell>
                    </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
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

export default PatientsTable