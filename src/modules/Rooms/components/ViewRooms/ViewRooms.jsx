import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getRooms } from "../../store/slices/viewRoomSlice"

const ViewRooms = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRooms())
    }, [])

  return (
    <Box sx={{p: '1rem'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead sx={{background: '#6439ff'}}>
              <TableRow>
                    <TableCell>Rooms</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
    </Box>
  )
}

export default ViewRooms