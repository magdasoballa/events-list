 const EventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    location: Yup.string().required('Location is required'),
});

export default EventSchema