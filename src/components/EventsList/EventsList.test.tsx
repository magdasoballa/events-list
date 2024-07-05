import { screen } from '@testing-library/react';
import EventsList from './EventsList';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { simpleRender } from '../../utils';
import store from '../../redux/store';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EventsList', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            status: 200,
            data: [
                { id: 1, title: 'Event 1', date: '2024-07-01', description: 'Description 1' },
                { id: 2, title: 'Event 2', date: '2024-07-02', description: 'Description 2' },
            ],
        });
    });

    test('should render event items', async () => {
        jest.useFakeTimers();
        const { container } = await simpleRender(
            <Provider store={store}>
                <Router>
                    <EventsList />
                </Router>
            </Provider>
        );

        expect(container).toMatchSnapshot();
        jest.advanceTimersByTime(30000);

        const lists = screen.getAllByText('Events List');
        expect(lists[0]).toBeInTheDocument();
    });
});
