import { Paper, Box, Typography, Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAccountInfo } from "../../store/slices/accountSlice"
import { useNavigate } from "react-router-dom"
import PageTitle from "../../../../components/PageTitle/PageTitle"

const AccountInformation = () => {

    const {accountInfo, loading} = useSelector(state => state.account)
    const {roles} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAccountInfo())
    }, [])

    const handleNavigate = () => {
      if(roles === 'admin'){
        navigate('/admin/editAccount')
      }else if(roles === 'doctor'){
        navigate('/doctor/editAccount')
       }else if(roles === 'Patient'){
        navigate('/patient/editAccount')
       }
      }

  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      {loading && <Typography variant="h3">Loading...</Typography>}
      {
       !loading && accountInfo &&
        <Paper sx={{width: '60%', p: '1rem', mt: '2rem'}}>
          <PageTitle title='Your account information' />
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <Typography variant='h6'>User Name:</Typography>
            <Typography variant='body2'>{accountInfo?.name}</Typography>
          </Box>

          <Box sx={{display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '0.5rem',mb: '1rem'}}>
            <Typography variant='h6'>Email:</Typography>
            <Typography variant='body2'>{accountInfo?.email}</Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button sx={{background: '#2e7c67', color: 'white'}} onClick={handleNavigate}>
              Edit Account
            </Button>
          </Box>
          
        </Paper>
       }
    </Box>
  )
}

export default AccountInformation