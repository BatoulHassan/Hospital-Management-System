import * as Yup from 'yup'

export const AddScheduleValidation = Yup.object({
    doctor_id: Yup.string().required('Required'),
      start_date: Yup.date().required('Required').nullable(),
      end_date: Yup.date().required('Required')
                   .min(Yup.ref('start_date'), 'End date must be after start date')
                   .nullable(),
      start_time: Yup.string().required('Required'),
      end_time:  Yup.string()  
      .required('End time is required')  
      // .test('is-greater', 'End time must be after start time', function (value) {  
      // const { start_time } = this.parent;  
      // return new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${start_time}`);  
      // }),
})