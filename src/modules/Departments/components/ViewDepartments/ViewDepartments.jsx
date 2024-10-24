import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDepartments } from "../../store/slices/viewDepartmentsSlice"
import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Typography,
         Snackbar, Alert } from "@mui/material"
import { StyledTableRow, ActionButton } from './style'
import { useNavigate } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"
import { deleteDepartmentItem, clearDeleteDepartmentMsg } from "../../store/slices/deleteDepartmentSlice"

const ViewDepartments = () => {

    const {departments, loading, error} = useSelector(state => state.viewDepartments)
    const deleteState = useSelector(state => state.deleteDepartment)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false);  
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    useEffect(() => {
        dispatch(getDepartments())
        dispatch(clearDeleteDepartmentMsg())
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
      dispatch(deleteDepartmentItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getDepartments())
      })
      .catch((error) => {  
        console.error("Failed to delete department:", error);  
      })
    }

    const handleSnackbarClose = () => {  
      setOpenSnackbar(false);  
    }

  return (
    <Box sx={{p: '1rem'}}>
        <PageTitle title='Departments:' />
        {loading && <Typography variant="h2">Loading...</Typography>}
        {!loading &&  error && <h5>{error}</h5>}
        {!loading && departments && 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Total Rooms</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
            
             {departments?.map(department => (
                <StyledTableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.rooms.length}</TableCell>
                  <TableCell>
                    <ActionButton sx={{mr: '0.5rem'}}
                                  onClick={() => {navigate(`viewRooms/${department.id}`)}}>
                                    Rooms
                    </ActionButton>
                    <ActionButton sx={{mr: '0.5rem'}} 
                                  onClick={() => {navigate(`editDepartment/${department.id}`)}}>
                                     Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClick(department.id)}>Delete</ActionButton>
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

        {deleteState.message &&    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openSnackbar}  
                        onClose={handleSnackbarClose}   
                        autoHideDuration={3000}>
                        <Alert onClose={handleSnackbarClose} severity="success">  
                          {deleteState.message}
                        </Alert> 
                    </Snackbar> }

        {deleteState.error &&    <Snackbar
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

export default ViewDepartments