import { Box, Card, CardContent, Typography,
         List, ListItemText, CardActions, Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import DetailsListItem from "../MedicalDetails/DetailsListItem"

const PatientConditionsDetails = () => {

  const {id} = useParams()
  const {patientConditions} = useSelector(state => state.patientConditions)
  const medicalCondition = patientConditions?.find(item => item.id === Number(id))
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formatedDate = date.toLocaleString('en-US', {  
      year: 'numeric',  
      month: 'long',  
      day: 'numeric', 
      hour: '2-digit',  
      minute: '2-digit',  
      second: '2-digit',  
      hour12: true,  
    })
    return formatedDate
  }

  const followUpDate = medicalCondition.follow_up === 1 ?
                                      formatDate(medicalCondition.follow_up_date)
                                                        : null

  const surgeryDate = medicalCondition.surgery_required === 1 ?
                                      formatDate(medicalCondition.surgery.surgery_date)
                                                              : null

  const handleNavigate = () => {
        navigate('/patient/medicalConditions')
  }

  return (
    <Box sx={{p: '1rem'}}>
      <Card>
        <CardContent>
          <Typography variant='h5' gutterBottom sx={{p: '0.5rem', color: '#2e7c67'}}>
            Details of your mediacl condition
          </Typography>

          <DetailsListItem 
                    title="Patient National ID:" 
                    value={medicalCondition.patient_national_id}
                    isOdd={true} />

          <DetailsListItem 
                    title="Description:" 
                    value={medicalCondition.condition_description}
                    isOdd={false} />
        
          <DetailsListItem 
                    title="Medications:" 
                    value={medicalCondition.medications}
                    isOdd={true} />

          <DetailsListItem 
                    title="Doctor ID:" 
                    value={medicalCondition.doctor_id}
                    isOdd={false} />

          <DetailsListItem 
                    title="Department ID:" 
                    value={medicalCondition.department_id}
                    isOdd={true} />

          <DetailsListItem 
                    title="Room ID:" 
                    value={medicalCondition.room_id}
                    isOdd={false} />

          <Box sx={{display: 'flex', background: "#f5f5f5"}}>
            <Typography variant="h6" sx={{mr: '0.3rem'}}>Services:</Typography>
                <List sx={{pt: '4px'}}>
                 {medicalCondition.services.map((item,index) => (
                   <ListItemText key={index} primary={`${index+1}.${item.name}`} />
                 ))}
                </List>
          </Box>

          <DetailsListItem 
                    title="Follow Up:" 
                    value={medicalCondition.follow_up === 1 ? 
                                                             "true" 
                                                            : 
                                                             "false"}
                    isOdd={false} />

         {
            medicalCondition.follow_up === 1 &&
            <DetailsListItem 
                    title="Follow Up Date:" 
                    value={followUpDate} />
          }

         <DetailsListItem 
                    title="Surgery Required:" 
                    value={medicalCondition.surgery_required === 1 ? 
                                                             "true" 
                                                            : 
                                                             "false"}
                    isOdd={true} />

        {
          medicalCondition.surgery_required === 1 && 
          <>
            <DetailsListItem 
                    title="Surgery Type:" 
                    value={medicalCondition.surgery.surgery_type}
                    isOdd={false} />

            <DetailsListItem 
                    title="Surgery Date:" 
                    value={surgeryDate}
                    isOdd={true} />

            <DetailsListItem 
                    title="Surgery Department:" 
                    value={medicalCondition.surgery.department_id}
                    isOdd={false} />

            <DetailsListItem 
                    title="Surgery Room:" 
                    value={medicalCondition.surgery.room_id}
                    isOdd={true} />

            <Box sx={{display: 'flex'}}>
                <Typography variant="h6" sx={{mr: '0.3rem'}}>Medical Staff IDs:</Typography>
                  <List sx={{pt: '4px'}}>
                    {medicalCondition.surgery.medical_staff.map((item,index) => (
                      <ListItemText key={index} primary={`${index+1}.Doctor With ID ${item}`} />
                   ))}
                  </List>
            </Box>
          </>
          }

        </CardContent>
        <CardActions>
          <Button onClick={handleNavigate} 
                  sx={{background: '#2e7c67', 
                  color: 'white',
                  ml: '0.5rem',
                  width: '88px'}}>
                  Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default PatientConditionsDetails