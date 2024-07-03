import React from 'react';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEventForm.scss'
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EventData } from '../../interfaces/eventInterfaces';

const AddEventForm: React.FC = () => {
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const re = /^\d{9}$/;
        return re.test(phoneNumber);
    };

    const handleSubmit = async (values: EventData, { setErrors }: FormikHelpers<EventData>) => {
        const { title, date, time, description, image, category, phoneNumber, email, location } = values;
        const newErrors: { [key: string]: string } = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number. It should contain 9 digits.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newEvent = {
            title,
            date,
            time,
            description,
            image,
            category,
            phoneNumber,
            email,
            location,
        };

        try {
            await axios.post('http://localhost:3001/events', newEvent);
            navigate('/events');
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleBackToList = () => {
        navigate('/events');
    };

    const initialValues: EventData = {
        title: '',
        category: '',
        date: '',
        time: '',
        description: '',
        phoneNumber: '',
        email: '',
        location: '',
        image: ''
    };

    const eventSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        date: Yup.date().required('Date is required'),
        time: Yup.string().required('Time is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        location: Yup.string().required('Location is required'),
    });

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Add event
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={eventSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={touched.date && !!errors.date}
                                    helperText={touched.date && errors.date}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Time"
                                    type="time"
                                    name="time"
                                    value={values.time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={touched.time && !!errors.time}
                                    helperText={touched.time && errors.time}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    error={touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Image URL"
                                    name="image"
                                    value={values.image}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={touched.image && !!errors.image}
                                    helperText={touched.image && errors.image}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required error={touched.category && !!errors.category}>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Category"
                                    >
                                        <MenuItem value="Sport">Sport</MenuItem>
                                        <MenuItem value="Kultura">Kultura</MenuItem>
                                        <MenuItem value="Zdrowie">Zdrowie</MenuItem>
                                    </Select>
                                    {touched.category && errors.category && (
                                        <Typography color="error">{errors.category}</Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    required
                                    error={touched.location && !!errors.location}
                                    helperText={touched.location && errors.location}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add Event
                                </Button>
                                <Button variant="outlined" sx={{ marginLeft: '10px' }} color="secondary" onClick={() => resetForm()}>
                                    Clear
                                </Button>
                                <Button variant="contained" sx={{ marginLeft: '10px' }} onClick={handleBackToList}>
                                    Back to Events List
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddEventForm;
