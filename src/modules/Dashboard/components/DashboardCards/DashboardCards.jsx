import { Box } from '@mui/material'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import PeopleIcon from '@mui/icons-material/People';
import DashboardCard from '../DashboardCard/DashboardCard'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DomainIcon from '@mui/icons-material/Domain'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'

const DashboardCards = () => {
  return (
    <Box sx={{p: '1rem'}}>
      <PageTitle title='Hospital Management System Dashboard:'/>
      <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'}}>
        <DashboardCard Icon={AccessibleForwardIcon} number='150' title='Our Patients' />
        <DashboardCard Icon={DomainIcon} number='150' title='Our Departments' />
        <DashboardCard Icon={PeopleIcon} number='200' title='Our Employees' />
        <DashboardCard Icon={HealthAndSafetyIcon} number='200' title='Our Doctors' />
        <DashboardCard Icon={LocalPharmacyIcon} number='30' title='Pharmacists' />
        <DashboardCard Icon={MedicalServicesIcon} number='50' title='Our Services' />
      </Box>
    </Box>
  )
}

export default DashboardCards