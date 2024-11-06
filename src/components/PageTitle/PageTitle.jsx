import { Box, Typography } from "@mui/material"
import PropTypes from 'prop-types'; 

const PageTitle = ({title}) => {
  return (
    <Box>
        <Typography variant="h5" 
                    sx={{color: '#2e7c67', 
                         pb: '1rem',
                         fontSize:{xs: "18px", sm: '1.5rem'},
                         display: 'flex',
                         justifyContent: 'center'}}>
                      {title}
        </Typography>
    </Box>
  )
}

PageTitle.propTypes = {   
    title: PropTypes.string.isRequired,
  };

export default PageTitle