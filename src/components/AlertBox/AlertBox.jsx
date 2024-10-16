import { Snackbar, Alert } from '@mui/material'
import { useDispatch } from 'react-redux'
import { hideAlert } from '../../store/slices/alertSlice'
import PropTypes from 'prop-types'; 
import { memo } from 'react';

const AlertBox = ({open, message}) => {

  const dispatch = useDispatch()

  const handleCloseAlert = () => {
    dispatch(hideAlert())
  }

  return (
    <Snackbar   
           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
           open={open}   
           autoHideDuration={3000}   
           onClose={handleCloseAlert}>

           <Alert onClose={handleCloseAlert} severity="success">  
            {message}  
           </Alert>  
      </Snackbar>
  )
}

AlertBox.propTypes = {  
  open: PropTypes.bool.isRequired ,  
  message: PropTypes.string.isRequired,
};

export default memo(AlertBox)