import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Typography,
         Dialog, DialogActions, DialogContent, DialogContentText, 
         DialogTitle, Button, Snackbar, Alert } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteRoom, getRooms } from "../../store/slices/viewRoomsSlice"
import { ActionButton, StyledTableRow } from "./style"
import { useNavigate } from "react-router-dom"

const ViewRooms = () => {
    const {rooms, loading, error} = useSelector(state => state.viewRooms)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
console.log(rooms)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRooms())
    }, [])

    const handleDeleteRoom = (id) => {  
      setIdToDelete(id);  
      setOpenDialog(true);  
    }

    const handleDialogClose = () => {  
      setOpenDialog(false);  
      setIdToDelete(null);  
    }

    const handleConfirmDelete = () => {
      dispatch(deleteRoom(idToDelete))
      setOpenSnackbar(true)
      handleDialogClose()
    }

    const handleSnackbarClose = () => {  
      setOpenSnackbar(false);  
    }

  return (
    <Box sx={{p: '1rem'}}>
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h5'>{error}</Typography>}
      {!loading && rooms &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                    <TableCell>Room ID</TableCell>
                    <TableCell>Room Number</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rooms?.map(room => (
                  <StyledTableRow key={room.id}>
                    <TableCell>{room.id}</TableCell>
                    <TableCell>{room.number}</TableCell>
                    <TableCell>{room.department.name}</TableCell>
                    <TableCell>{room.status}</TableCell>
                    <TableCell>
                      <ActionButton sx={{mr: '0.5rem'}} onClick={() => {navigate(`editRoom/${room.id}`)}}>Edit</ActionButton>
                      <ActionButton onClick={() => handleDeleteRoom(room.id)}>Delete</ActionButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      }

<Dialog open={openDialog} onClose={handleDialogClose}>
           <DialogTitle>Confirm Delete</DialogTitle>
           <DialogContent>  
             <DialogContentText>  
               Are you sure you want to delete this room? 
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
              Room deleted successfully! 
           </Alert> 
      </Snackbar>
    </Box>
  )
}

export default ViewRooms