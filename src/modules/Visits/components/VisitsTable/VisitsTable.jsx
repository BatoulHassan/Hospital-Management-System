import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Typography,
         Snackbar, Alert} from '@mui/material'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getVisits } from '../../store/slice/visitsSlice'
import { StyledTableRow, ActionButton } from '../../../../Styles/Styles'
import { useNavigate } from 'react-router-dom'
import { deleteVisitItem } from '../../store/slice/deleteVisitSlice'
import DeleteDialog from '../../../../components/DeleteDialog/DeleteDialog'

const VisitsTable = () => {

  const {loading, error, visits} = useSelector(state => state.visits)
  const deleteState = useSelector(state => state.deleteVisit)
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
    dispatch(deleteVisitItem(idToDelete))
    .then(() => {  
      setOpenSnackbar(true) 
      dispatch(getVisits());
      
    })
    .catch((error) => {  
      console.error("Failed to delete visit:", error);  
    })
  }

  useEffect(() => {
    dispatch(getVisits())
  }, [])

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title="Patient's Visits:" />
       {loading && <Typography variant='h3'>Loading...</Typography>}
       {!loading && error && <Typography variant='h3'>{error}</Typography>}
       {
         !loading && visits &&
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{background: '#2e7c6747'}}>
                <TableRow>
                    <TableCell>Patient National ID</TableCell>
                    <TableCell>Entry Time</TableCell>
                    <TableCell>Exit Time</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  visits?.map(visit => (
                    <StyledTableRow key={visit.id}>
                      <TableCell>{visit.patient.national_id}</TableCell>
                      <TableCell>{visit.entry_time}</TableCell>
                      <TableCell>{visit.exit_time}</TableCell>
                      <TableCell sx={{display: 'flex'}}>
                        <ActionButton sx={{mr: '0.5rem'}}
                                      onClick={() => navigate(`editVisit/${visit.id}`)}>
                                        Edit
                        </ActionButton>
                        <ActionButton onClick={() => handleDeleteClick(visit.id)}>Delete</ActionButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                }
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
                    </Snackbar>}
          
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

export default VisitsTable