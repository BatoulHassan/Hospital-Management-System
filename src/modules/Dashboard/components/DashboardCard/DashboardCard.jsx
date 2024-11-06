import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { memo } from 'react';
import { CardBox } from './style'

const DashboardCard = ({Icon,number,title}) => {

  return (
    <CardBox>
      <Card>
        <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box>
            <IconButton sx={{background: '#b2d2c98a'}}>
              <Icon />
            </IconButton>
          </Box>
          <Box sx={{width: '110px'}}>
            <Typography variant='h6'>{number}</Typography>
            <Typography variant='body2'>{title}</Typography>
          </Box>
        </CardContent>
      </Card>
    </CardBox>
  )
}

DashboardCard.propTypes = {  
    Icon: PropTypes.elementType ,  
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

export default memo(DashboardCard)