import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMedicalConditions } from "../../store/slices/medicalConditionsSlice"
import PageTitle from "../../../../components/PageTitle/PageTitle"
import { Box, Typography,  TableContainer, Paper,
         Table, TableHead, TableRow, TableCell,
         TableBody, Snackbar, Alert } from "@mui/material"
import { ActionTableCell } from './style'
import { StyledTableRow, ActionButton } from "../../../../Styles/Styles"
import { useNavigate } from "react-router-dom"
import ShiftSurgery from "../ShiftSurgery/ShiftSurgery"
import { clearEdittingMedicalMsg } from "../../store/slices/editMedicalSlice"
import { clearDeleteMedicalMsg, deleteMedicalItem } from "../../store/slices/deleteMedicalSlice"
import DeleteDialog from "../../../../components/DeleteDialog/DeleteDialog"
import PropTypes from 'prop-types'; 
import { memo } from 'react';

const MedicalConditionsTable = ({showAction}) => {

  const {medicalConditions, loading, error} = useSelector(state => state.medicalConditions)
  const deleteState = useSelector(state => state.deleteMedical)
  const [itemToChange, setItemToChange] = useState(null)
  const [open, setOpen] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMedicalConditions())
    dispatch(clearDeleteMedicalMsg())
  }, [dispatch])

  const handleCloseShiftDialog = () => {
    setOpen(false)
    setItemToChange(null)
  }

  const refresh = () => {  
    dispatch(getMedicalConditions())
  } 

  const handleChangeDate = (medicalCondition) => {
    dispatch(clearEdittingMedicalMsg())
    setItemToChange(medicalCondition)
    setOpen(true)
  }

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
      dispatch(deleteMedicalItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getMedicalConditions())
      })
      .catch((error) => {  
        console.error("Failed to delete doctor:", error);  
      })
    }

  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Medical Conditions:' />
      {loading && <Typography variant='h3'>Loading...</Typography>}
      {!loading && error && <Typography variant='h3'>{error}</Typography>}

      {
      !loading && 
        !error && 
          medicalConditions?.length === 0 ?
                                           <Typography>No medical conditions added</Typography>
                                          : 
      
        !loading && medicalConditions &&
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
                          {medicalConditions?.map(item => (
                          <StyledTableRow key={item.id}>
                            <TableCell>{item.patient_national_id}</TableCell>
                            <TableCell>{item.condition_description}</TableCell>
                            <TableCell>{item.follow_up === 1 ? 'true' : 'false'}</TableCell>
                            <TableCell>{item.surgery_required === 1 ? 'true' : 'false'}</TableCell>
                            <TableCell>
                              {
                                item.surgery_required === 1 ? formatDate(item.surgery.surgery_date)
                                                              
                                                            : '__'
                              }

                            </TableCell>
                            
                            <ActionTableCell>
                               <Box>
                                <ActionButton sx={{mr: '0.5rem', width: '94px'}} 
                                              onClick={() => navigate(`details/${item.id}`)}>
                                        Details
                                </ActionButton>
                                <ActionButton sx={{width: '94px'}}
                                              onClick={() => navigate(`editMedical/${item.id}`)}>
                                        Edit
                                </ActionButton>
                               </Box>
                               <Box>
                                <ActionButton 
                                     sx={{mr: '0.5rem',width: '94px'}}
                                     onClick={() => handleChangeDate(item)}
                                     disabled={item.surgery_required === 1 ? false : true}>
                                        Shift Surgery
                                </ActionButton>
                                {
                                  showAction &&
                                  <ActionButton sx={{width: '94px'}}
                                               onClick={() => handleDeleteClick(item.id)}>
                                        Delete
                                </ActionButton>
                                }
                               </Box>
                            </ActionTableCell>
                          </StyledTableRow>
                        ))} 
                        </TableBody>
                      </Table>
                     </TableContainer>
      }

      {
        itemToChange && <ShiftSurgery 
                         itemToChange={itemToChange}
                         open={open}
                         handleCloseShiftDialog={handleCloseShiftDialog}
                         refresh={refresh} />
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

MedicalConditionsTable.propTypes = {  
  showAction: PropTypes.bool.isRequired ,  
}

export default memo(MedicalConditionsTable)