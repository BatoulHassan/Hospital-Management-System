import { Box, Dialog, DialogTitle, DialogContent, 
         DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material'
import PropTypes from 'prop-types'; 

const DeleteDialog = ({openDialog, handleDialogClose, handleConfirmDelete, openSnackbar, handleSnackbarClose}) => {

  return (
    <Box>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>  
             <DialogContentText>  
               Are you sure you want to delete? 
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
                  Deleted successfully! 
             </Alert> 
        </Snackbar> 
        
    </Box>
  )
}

DeleteDialog.propTypes = {  
    openDialog: PropTypes.bool,
    handleDialogClose: PropTypes.func,
    handleConfirmDelete: PropTypes.func,
    openSnackbar: PropTypes.bool,
    handleSnackbarClose: PropTypes.func,
  };

export default DeleteDialog