import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Typography,
         Snackbar, Alert} from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRooms } from "../../store/slices/viewRoomsSlice"
import { ActionButton, StyledTableRow } from "./style"
import { useNavigate } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"
import { deleteRoomItem, clearDeleteRoomMsg } from "../../store/slices/deleteRoomSlice"

const ViewRooms = () => {
    const {rooms, loading, error} = useSelector(state => state.viewRooms)
    const deleteState = useSelector(state => state.deleteRoom)
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRooms())
        dispatch(clearDeleteRoomMsg())
    }, [])

    const handleDeleteClick = (id) => { 
      setIdToDelete(id);  
      setOpenDialog(true);  
    }

    const handleDialogClose = () => {  
      setOpenDialog(false);  
      setIdToDelete(null);  
    }

    const handleConfirmDelete = () => {
      dispatch(deleteRoomItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getRooms())
      })
      .catch((error) => {  
        console.error("Failed to delete room:", error);  
      })
    }

    const handleSnackbarClose = () => {  
      setOpenSnackbar(false);  
    }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title="Rooms:" />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h5'>{error}</Typography>}
      {!loading && rooms &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
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
                      <ActionButton onClick={() => handleDeleteClick(room.id)}>
                        Delete
                      </ActionButton>
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

export default ViewRooms