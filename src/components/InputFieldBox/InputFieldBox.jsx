import { InputBox, InputField } from './style'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'; 

const InputFieldBox = ({type,name,label,value,onChange,onBlur,touched,errors}) => {

  return (
    <InputBox>
        <InputField variant='outlined' 
                    type={type} 
                    name={name} 
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} 
                    label={label}
                    sx={{width: {xs: '100%', sm: '50%'} }}  />
                    {touched && errors &&
                        <Typography variant='body2' color='error'>
                            {errors}
                        </Typography>  
                     }
    </InputBox>
  )
}

InputFieldBox.propTypes = {  
    type: PropTypes.string.isRequired ,  
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    errors: PropTypes.string,
  };

export default InputFieldBox