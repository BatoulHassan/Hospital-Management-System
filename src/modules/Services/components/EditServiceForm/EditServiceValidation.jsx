import * as Yup from 'yup';

export const EditServiceValidation = Yup.object({
      name: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      special_instructions: Yup.string().required('Required'),
      department_id: Yup.string().required('Required'),
})