import { Box, Typography } from "@mui/material"
import { FormPaper, InputField, AddButton, InputBox, ButtonContainer, TypographyError } from './style'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup';  
import { useFormik } from 'formik'
import AlertBox from "../../../../components/AlertBox/AlertBox";
import { clearEdittingSpecailMsg, updateSpecialization } from "../../store/slices/editSpecializationSlice";
import { useEffect } from "react";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const EditSpecializationForm = () => {
  
  const {specializations} = useSelector(state => state.specializations)
  const {loading, error, message} = useSelector(state => state.editSpecialization)

  const {id} = useParams()
  const specialization = specializations?.find(item => item.id === Number(id))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearEdittingSpecailMsg())
  }, [])

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      id: specialization.id,
      name: specialization.name,  
    },
    validationSchema: Yup.object({  
      name: Yup.string()  
        .required('Specialization name is required')  
        .min(2, 'Must be at least 2 characters long'),  
    }),
    onSubmit: (values) => {
      dispatch(updateSpecialization(values))
      dispatch(clearEdittingSpecailMsg())
    },
  })

  const handleNavigate = () => {
    navigate('/admin/specializations')
  }

  return (
    <Box sx={{padding: '1rem'}}>
      <FormPaper>
        <form onSubmit={handleSubmit}>
              <PageTitle title="Edit Specialization:" />   
              <InputBox>
                <InputField variant='outlined' 
                     type='text' 
                     name='name' 
                     value={values.name}
                     onChange={handleChange}
                     onBlur={handleBlur} 
                     label='Name'
                     size='small' 
                     sx={{width: {xs: '100%', sm: '50%'} }}  />
                     {touched.name && errors.name &&
                          <Typography variant='body2' color='error'>{errors.name}</Typography>  
                     }
              </InputBox>

              <ButtonContainer>
                <AddButton type='submit' sx={{width: '88px'}}>
                  {loading ? "Editting..." : "Edit"}
                </AddButton>
                <AddButton onClick={handleNavigate}>Back to Specializations</AddButton>
            </ButtonContainer>
        </form>
            {message && <AlertBox open={true} message={message} />}
            {error && <TypographyError variant='body2' color='error'>{error}</TypographyError>}
      </FormPaper>
    </Box>
  )
}

export default EditSpecializationForm