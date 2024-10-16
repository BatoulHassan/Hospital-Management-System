import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDepartments, deleteDepartment } from "../../store/slices/viewDepartmentsSlice"
import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Dialog, DialogActions,  
         DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert } from "@mui/material"
import { StyledTableRow, ActionButton } from './style'
import { useNavigate } from "react-router-dom"

const ViewDepartments = () => {

    const {departments, loading} = useSelector(state => state.ViewDepartments)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false);  

    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    const handleDeleteClick = (id) => {  
      setIdToDelete(id);  
      setOpenDialog(true);  
    }; 

    const handleDialogClose = () => {  
      setOpenDialog(false);  
      setIdToDelete(null);  
    }

    const handleConfirmDelete = () => {
      dispatch(deleteDepartment(idToDelete))
      setOpenSnackbar(true)
      handleDialogClose()
    }

    const handleSnackbarClose = () => {  
      setOpenSnackbar(false);  
    }

  return (
    <Box sx={{p: '1rem'}}>
        {loading && <h3>Loading...</h3>}
        {!loading && departments && 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
            
             {departments?.map(department => (
                <StyledTableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>
                    <ActionButton sx={{mr: '0.5rem'}}>Details</ActionButton>
                    <ActionButton sx={{mr: '0.5rem'}} onClick={() => {navigate(`editDepartment/${department.id}`)}}> Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClick(department.id)}>Delete</ActionButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        }

        <Dialog open={openDialog} onClose={handleDialogClose}>
           <DialogTitle>Confirm Delete</DialogTitle>
           <DialogContent>  
             <DialogContentText>  
               Are you sure you want to delete this department? 
             </DialogContentText>  
           </DialogContent>
           <DialogActions>  
              <Button onClick={handleDialogClose} color="primary">  
                 Cancel  
              </Button>  
              <Button onClick={handleConfirmDelete} color="secondary">  
                 Delete  
              </Button>  
           </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}  
        onClose={handleSnackbarClose}   
        autoHideDuration={3000}>
          <Alert onClose={handleSnackbarClose} severity="success">  
              Department deleted successfully! 
           </Alert> 
      </Snackbar>  
    </Box>
  )
}

export default ViewDepartments