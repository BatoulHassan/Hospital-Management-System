import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPatientConditions } from "../../store/slices/patientConditionsSlice"
import { Box, Typography, TableContainer, Paper,
         Table, TableHead, TableRow, TableCell,
         TableBody } from "@mui/material"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { StyledTableRow, ActionButton } from '../../../../Styles/Styles'
import { useNavigate } from "react-router-dom"

const PatientConditionsTable = () => {

    const { patientConditions, loading, error } = useSelector(state => state.patientConditions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(getPatientConditions())
    }, [])

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const formatedDate = date.toLocaleString('en-US', {  
        year: 'numeric',  
        month: 'long',  
        day: 'numeric', 
        hour: '2-digit',  
        minute: '2-digit',  
        second: '2-digit',  
        hour12: true,  
      })
      return formatedDate
    }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Patient Conditions:' />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h3'>{error}</Typography>}
      {
       !loading && 
        !error && 
        patientConditions?.length === 0 ?
                                           <Typography>you do not have a medical conditions</Typography>
                                          : 
      
        !loading && patientConditions &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1100 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                  <TableCell>Patient National-id</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Follow Up</TableCell>
                  <TableCell>Sugery Required</TableCell>
                  <TableCell>Sugery Date</TableCell>
                  <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                patientConditions?.map(patientCondition => (
                  <StyledTableRow key={patientCondition.id}>
                      <TableCell>{patientCondition.patient_national_id}</TableCell>
                      <TableCell>{patientCondition.condition_description}</TableCell>
                      <TableCell>{patientCondition.follow_up === 1 ? 'true' : 'false'}</TableCell>
                      <TableCell>{patientCondition.surgery_required === 1 ? 'true' : 'false'}</TableCell>
                      <TableCell>
                              {
                                patientCondition.surgery_required === 1 ? 
                                                                         formatDate(patientCondition.surgery.surgery_date)
                                                                        : '__'
                              }

                      </TableCell>
                      <TableCell>
                      <ActionButton sx={{width: '94px'}} 
                                    onClick={() => navigate(`details/${patientCondition.id}`)}>
                        More Details
                      </ActionButton>
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

export default PatientConditionsTable