import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { EventData } from '../../interfaces/eventInterfaces';
import { format } from 'date-fns';

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventData | null>(null);

    useEffect(() => {
        const fetchEvent = async (eventId: string) => {
            try {
                const response = await axios.get(`http://localhost:3001/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        if (id) {
            fetchEvent(id);
        }
    }, [id]);

    const handleBackToList = () => {
        navigate('/events');
    };

    if (!event) {
        return <Typography variant="h6">Event not found!</Typography>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return format(date, 'dd.MM.yyyy');
    };

    return (
        <Card>
            <CardContent style={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {event?.title && (
                            <Typography variant="h5" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
                                {event?.title}
                            </Typography>
                        )}
                        {event?.category && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Category: {event?.category}
                            </Typography>
                        )}
                        {event?.date && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Date: {formatDate(event?.date)}
                            </Typography>
                        )}
                        {event?.time && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Time: {event?.time}
                            </Typography>
                        )}
                        {event?.description && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Description: {event?.description}
                            </Typography>
                        )}
                        {event?.phoneNumber && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Phone: {event?.phoneNumber}
                            </Typography>
                        )}
                        {event?.email && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Email: {event?.email}
                            </Typography>
                        )}
                        {event?.location && (
                            <Typography style={{ marginBottom: '8px' }}>
                                Location: {event?.location}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                            onClick={handleBackToList}
                        >
                            Back to Events List
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {event?.image && (
                            <img src={event.image} style={{ width: '100%', height: 'auto' }} alt="event" />
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EventDetail;
