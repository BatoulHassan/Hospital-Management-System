import { Box, TableContainer, Paper, Table,
         TableHead, TableRow, TableCell, 
         TableBody, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { StyledTableRow, ActionButton } from "../../../../Styles/Styles"

const ViewAvailableRooms = () => {

  const {id} = useParams()
  const {roles} = useSelector(state => state.auth)
  const {departments} = useSelector(state => state.viewDepartments)
  const department = departments.find(item => item.id === Number(id))
  const availableRooms = department?.rooms?.filter(item => item.status === 'vacant')

  const navigate = useNavigate()

  const handleNavigate = () => {
    if(roles === 'admin'){
      navigate("/admin/departments")
    }else if(roles === 'doctor'){
      navigate("/doctor/departments")
    }
  }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title={`Available rooms in ${department?.name} department`} />
      {
        !availableRooms?.length ? <Typography sx={{textAlign: 'center'}}>
                                   No Available rooms in this department!
                                  </Typography>
                                : <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 600 }}>
                                      <TableHead sx={{background: '#2e7c6747'}}>
                                        <TableRow>
                                          <TableCell>ID</TableCell>
                                          <TableCell>Number</TableCell>
                                          <TableCell>Status Room</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {
                                          availableRooms?.map(room => (
                                            <StyledTableRow key={room.id}>
                                              <TableCell>{room.id}</TableCell>
                                              <TableCell>{room.number}</TableCell>
                                              <TableCell>{room.status}</TableCell>
                                            </StyledTableRow>
                                          ))
                                        }
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
      }

      <Box sx={{mt: '1rem'}}>
         <ActionButton onClick={handleNavigate}>Back</ActionButton>
      </Box>
    </Box>
  )
}

export default ViewAvailableRooms