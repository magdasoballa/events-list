import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEventForm.scss'

const AddEventForm: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const re = /^\d{9}$/;
        return re.test(phoneNumber);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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

    const handleClear = () => {
        setTitle('');
        setDate('');
        setTime('');
        setDescription('');
        setImage('');
        setCategory('');
        setPhoneNumber('');
        setEmail('');
        setLocation('');
        setErrors({});
    };

    const handleBackToList = () => {
        navigate('/events');
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Add event
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required >
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-label"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as string)}
                                label="Category"
                            >
                                <MenuItem value="Sport">Sport</MenuItem>
                                <MenuItem value="Kultura">Kultura</MenuItem>
                                <MenuItem value="Zdrowie">Zdrowie</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            fullWidth
                            required
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button type="submit" variant="contained" color="primary">
                            Add Event
                        </Button>
                        <Button variant="outlined" sx={{ marginLeft: '10px' }} color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained" sx={{ marginLeft: '10px' }} onClick={handleBackToList}>
                            Back to Events List
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AddEventForm;
