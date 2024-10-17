import { Box, TableContainer, Paper, Table, TableHead, 
         TableRow, TableCell, TableBody, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRooms } from "../../store/slices/viewRoomsSlice"
import { ActionButton, StyledTableRow } from "./style"

const ViewRooms = () => {
    const {rooms, loading, error} = useSelector(state => state.viewRooms)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRooms())
    }, [])

  return (
    <Box sx={{p: '1rem'}}>
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h5'>{error}</Typography>}
      {!loading && rooms &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                    <TableCell>Room Number</TableCell>
                    <TableCell>Department ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rooms?.map(room => (
                  <StyledTableRow key={room.id}>
                  <TableCell>{room.number}</TableCell>
                  <TableCell>{room.department_id}</TableCell>
                  <TableCell>{room.status}</TableCell>
                  <TableCell>
                    <ActionButton sx={{mr: '0.5rem'}}>Edit</ActionButton>
                    <ActionButton>Delete</ActionButton>
                  </TableCell>
                </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  )
}

export default ViewRooms