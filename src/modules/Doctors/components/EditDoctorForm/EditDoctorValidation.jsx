import * as Yup from 'yup';

export const EditDoctorValidation = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    // password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    department_id: Yup.string().required('Required'),
    specialization_id: Yup.string().required('Required'),
    //avatar: Yup.mixed(),
})