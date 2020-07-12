import * as Yup from 'yup';

const EditSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
    lastName: Yup.string().min(3, 'Last name must be at least 3 characters').required('Last name is required'),
})

export {
    EditSchema
}