import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecializations } from '../../store/slices/viewSpecializationsSlice'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { StyledTableRow, ActionButton } from './style'
import { useNavigate } from 'react-router-dom'
import DeleteDialog from '../../../../components/DeleteDialog/DeleteDialog'
import { deleteSpecializationItem } from '../../store/slices/deleteSpecializationSlice'

const SpecializationsTable = () => {

    const {loading, error, specializations} = useSelector(state => state.specializations)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleSnackbarClose = () => {  
      setOpenSnackbar(false);  
    }

    useEffect(() => {
        dispatch(getSpecializations())
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
      dispatch(deleteSpecializationItem(idToDelete))
      .then(() => {  
        setOpenSnackbar(true) 
        dispatch(getSpecializations());
        
      })
      .catch((error) => {  
        console.error("Failed to delete specialization:", error);  
      })
    }

  return (
    <Box sx={{p: '1rem'}}>
        <PageTitle title='Specailizations:' />
        {loading && <Typography variant='h3'>Loading...</Typography>}
        {!loading && error && <Typography variant='h3'>{error}</Typography>}
        {!loading && specializations &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead sx={{background: '#2e7c6747'}}>
              <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Specialization</TableCell>
                    <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {specializations?.map(specialization => (
                <StyledTableRow key={specialization.id}>
                  <TableCell>{specialization.id}</TableCell>
                  <TableCell>{specialization.name}</TableCell>
                  <TableCell>
                    <ActionButton sx={{mr: '0.5rem'}} 
                                  onClick={() => navigate(`editSpecialization/${specialization.id}`)}>
                                     Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClick(specialization.id)}>Delete</ActionButton>
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
    </Box>
  )
}

export default SpecializationsTable