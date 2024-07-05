import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EventDetail from './EventDetail';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import EventsList from '../EventsList/EventsList';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockEvent = {
    id: '1',
    title: 'Event 1',
    category: 'Kultura',
    date: '01.07.2024',
    time: '10:00',
    description: 'Description of Event 1',
    phoneNumber: '123-456-1',
    email: 'sample@example.com',
    location: 'Location 1',
    image: 'http://example.com/sample.jpg',
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('EventDetail component', () => {
    beforeEach(() => {
        mockAxios.get.mockResolvedValue({
            status: 200,
            data: mockEvent,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render event details correctly and navigate on button click', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/events/1']}>
                        <Routes>
                            <Route path="/events/:id" element={<EventDetail />} />
                            <Route path="/events" element={<EventsList />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Event 1')).toBeInTheDocument();
        });

        const backButton = screen.getByRole('button', { name: 'Back to Events List' });
        expect(backButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(backButton);
        });

        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/events');
    });
});
