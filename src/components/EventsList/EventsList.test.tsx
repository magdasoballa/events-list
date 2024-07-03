import React from 'react';
import { render, screen, act } from '@testing-library/react';
import EventsList from './EventsList';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EventsList', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            status: 200,
            data: [
                { id: 1, title: 'Event 1', date: '2024-07-01', description: 'Description 1' },
                { id: 2, title: 'Event 2', date: '2024-07-02', description: 'Description 2' },
            ],
        });
    });

    test('renders the Events List title', async () => {
        await act(async () => {
            render(
                <Router>
                    <EventsList />
                </Router>
            );
        });
        expect(await screen.findByText('Events List')).toBeInTheDocument();
    });

    test('renders event items', async () => {
        await act(async () => {
            render(
                <Router>
                    <EventsList />
                </Router>
            );
        });
        expect(await screen.findByText('Event 1')).toBeInTheDocument();
        expect(await screen.findByText('Event 2')).toBeInTheDocument();
    });

    test('renders Add Event button', async () => {
        await act(async () => {
            render(
                <Router>
                    <EventsList />
                </Router>
            );
        });
        expect(await screen.findByText('Add Event')).toBeInTheDocument();
    });
});
