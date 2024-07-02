import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Pagination, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { EventData } from '../../interfaces/eventInterfaces';
import axios from 'axios';

const EventsList: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3001/events');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getPaginatedEvents = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return events.slice(startIndex, endIndex);
    };

    const handleItemClick = (id: number) => {
        navigate(`/events/${id}`);
    };

    const handleAddEvent = () => {
        navigate('/add-event');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Events List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddEvent}>
                Add Event
            </Button>
            <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }}>
                <InputLabel id="items-per-page-label">Items per page</InputLabel>
                <Select
                    labelId="items-per-page-label"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    label="Items per page"
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
            <List>
                {getPaginatedEvents().map(event => (
                    <ListItem key={event.id} alignItems="flex-start" button onClick={() => handleItemClick(event.id)}>
                        <ListItemAvatar>
                            <Avatar>
                                <EventIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={event.title}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {event.date}
                                    </Typography>
                                    {" — " + event.description}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(events.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default EventsList;
