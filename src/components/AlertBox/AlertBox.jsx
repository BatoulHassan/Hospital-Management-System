import { Snackbar, Alert } from '@mui/material'
import PropTypes from 'prop-types'; 
import { memo, useState } from 'react';

const AlertBox = ({open, message}) => {

  const [isOpen, setIsOpen] = useState(open)
  
  const handleCloseAlert = () => {
    setIsOpen(false)
  }

  return (
    <Snackbar   
           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
           open={isOpen}   
           autoHideDuration={2000}   
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