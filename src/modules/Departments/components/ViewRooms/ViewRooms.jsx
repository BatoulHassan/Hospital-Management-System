import { Box, TableContainer, Paper, Table,
         TableHead, TableRow, TableCell, TableBody
         } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ActionButton, StyledTableRow } from "./style"
import { useState } from "react"
import ChangeStatusDialog from "../ChangeStatusDialog/ChangeStatusDialog"
import { clearEdittingMessage } from "../../../Rooms/store/slices/editRoomSlice"
import PageTitle from "../../../../components/PageTitle/PageTitle"

const ViewRooms = () => {

    const {departments} = useSelector(state => state.viewDepartments)
    const {id} = useParams()
    const department = departments.find(item => item.id === Number(id))
    const [roomTochange, setRoomToChange] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCloseDialog = () => {
      setOpen(false)
      setRoomToChange(null)
    }

    const handleChangeClick = (room) => {
      dispatch(clearEdittingMessage())
      setRoomToChange(room)
      setOpen(true)
    }

    const handleNavigate = () => {
      navigate("/admin/departments")
    }
  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title={`All rooms in ${department.name} department`} />
      {department &&
         <TableContainer component={Paper}>
           <Table sx={{ minWidth: 600 }}>
             <TableHead sx={{background: '#2e7c6747'}}>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Status Room</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
              {
                department?.rooms?.map(room => (
                  <StyledTableRow key={room.id}>
                    <TableCell>{room.id}</TableCell>
                    <TableCell>{room.number}</TableCell>
                    <TableCell>{room.status}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() =>handleChangeClick(room)}>Change Status</ActionButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              }
             </TableBody>
          </Table>
         </TableContainer>
      }

      {roomTochange && <ChangeStatusDialog 
                          roomTochange={roomTochange}
                          open={open} 
                          handleCloseDialog={handleCloseDialog}
                       /> }

      <Box sx={{display: 'flex', mt: '1rem'}}>
        <ActionButton sx={{width: '100px'}} onClick={handleNavigate}>Back</ActionButton>
      </Box>
      
    </Box>
  )
}

export default ViewRooms
