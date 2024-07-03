import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
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
    console.log(event)
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{event?.title}</Typography>
                <Typography>{format(new Date(event.date), 'dd.MM.yyyy')}</Typography>
                <Typography>{event.time}</Typography>
                <Typography>{event?.description}</Typography>
                <Typography>{event?.category}</Typography>
                <Typography>{event?.phoneNumber}</Typography>
                <Typography>{event?.email}</Typography>
                <Typography>{event?.location}</Typography>
                <Button variant="contained" onClick={handleBackToList}>
                    Back to Events List
                </Button>
            </CardContent>
        </Card>
    );
};

export default EventDetail;
