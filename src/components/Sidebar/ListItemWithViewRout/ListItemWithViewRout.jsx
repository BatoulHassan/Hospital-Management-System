import { ListItem, ListItemText, Collapse, List } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { memo, useState } from "react"
import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'

const ListItemWithViewRout = ({Icon, mainTitle,viewPath,viewLabel}) => {

    const [open, setOpen] = useState(false);  

    const handleToggle = () => {  
        setOpen(prev => !prev);  
    }

  return (
    <>
      <ListItem sx={{pb: '0',pt: '5px'}} onClick={handleToggle}>
        <Icon sx={{color: '#2e7c67'}}/>
        <ListItemText primary={mainTitle} sx={{ml: '0.5rem',color: '#595353'}} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink to={viewPath} style={({isActive}) => ({
                                  color: isActive ? '#2e7c67' : '#595353',
                                  textDecoration: 'none'})}>
            <ListItemText sx={{pl: '30px'}} primary={viewLabel} />
          </NavLink> 
        </List>
       </Collapse>
    </>
  )
}

ListItemWithViewRout.propTypes = {  
    Icon: PropTypes.elementType,  
    mainTitle: PropTypes.string.isRequired,
    viewPath: PropTypes.string.isRequired,
    viewLabel: PropTypes.string.isRequired,
  }

export default memo(ListItemWithViewRout)