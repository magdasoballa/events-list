import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Pagination, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Button, CircularProgress } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventsList.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setEvents } from '../../redux/events/eventSlice';

const EventsList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/events');
                if (response.status === 200) {
                    dispatch(setEvents(response.data));
                } else {
                    console.error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [dispatch]);

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
        <div className="list-wrapper">
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Events List
                </Typography>

                <FormControl variant="outlined" sx={{ marginBottom: 2, display: 'flex' }}>
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

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <List>
                            {getPaginatedEvents().map(event => (
                                <ListItem key={event.id} alignItems="flex-start" button onClick={() => handleItemClick(event.id as number)}>
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
                        <Button sx={{ width: '100%' }} variant="contained" color="primary" onClick={handleAddEvent}>
                            Add Event
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Pagination
                                count={Math.ceil(events.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
};

export default EventsList;
