import { Box, Typography, TableContainer, Paper, 
         Table, TableHead, TableRow, TableCell, TableBody,
         Snackbar, Alert } from "@mui/material"
import { StyledTableRow, ActionButton } from '../../../../Styles/Styles'
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getServices } from "../../store/slices/servicesSlice"
import { useNavigate } from "react-router-dom"
import { deleteServiceItem, clearServiceMsg } from "../../store/slices/deleteServiceSlice"
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"

const ServicesTable = () => {

  const {loading, error, services} = useSelector(state => state.services)
  const deleteState = useSelector(state => state.deleteService)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(getServices())
      dispatch(clearServiceMsg())
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
      dispatch(deleteServiceItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getServices());
      })
      .catch((error) => {  
        console.error("Failed to delete service:", error) 
      })
    }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Services:' />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h3'>{error}</Typography>}
      {!loading && services.length ? 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1120 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>description</TableCell>
                <TableCell>Special Instructions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                services?.map(service => (
                  <StyledTableRow key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.department.name}</TableCell>
                    <TableCell>{service.type}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.special_instructions}</TableCell>
                    <TableCell sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                      <ActionButton 
                            onClick={() => navigate(`editService/${service.id}`)}>
                              Edit
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteClick(service.id)}>Delete</ActionButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
         : 
         !loading && !error && !services.length ? <Typography variant='h3'>
                                                    No services added
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

export default ServicesTable