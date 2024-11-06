import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'; 
import { memo } from 'react';

const DetailsListItem = ({title, value, isOdd}) => {
  return (
    <Box sx={{display: 'flex', 
              alignItems: 'center', 
              p: '0.5rem', 
              background: isOdd === true ? '#f5f5f5' : 'white' 
            }}>
        <Typography variant="h6" sx={{mr: '0.3rem'}}>
            {title}
        </Typography>
        <Typography variant="body2" sx={{pt: '0.3rem', fontSize: '16px'}}>
                {value}
        </Typography>
    </Box>
  )
}

DetailsListItem.propTypes = {  
    value: PropTypes.any.isRequired ,  
    title: PropTypes.string.isRequired,
    isOdd: PropTypes.bool,
  }

export default memo(DetailsListItem)