import { ListItem, ListItemText, Collapse, List } from "@mui/material";
import { useState, memo } from "react"
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom"

const SidebarListItem = ({Icon, mainTitle,viewPath,viewLabel, addPath, addLabel}) => {

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
          <NavLink to={addPath} style={({isActive}) => ({
                                  color: isActive ? '#2e7c67' : '#595353',
                                  textDecoration: 'none'})}>
            <ListItemText sx={{pl: '30px'}} primary={addLabel} />
         </NavLink>  
        </List>
       </Collapse>
    </>
  )
}

SidebarListItem.propTypes = {  
    Icon: PropTypes.elementType,  
    mainTitle: PropTypes.string.isRequired,
    viewPath: PropTypes.string.isRequired,
    viewLabel: PropTypes.string.isRequired,
    addPath: PropTypes.string.isRequired,
    addLabel: PropTypes.string.isRequired,
  };

export default memo(SidebarListItem)