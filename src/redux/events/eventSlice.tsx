import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventData } from '../../interfaces/eventInterfaces';

interface EventsState {
    events: EventData[];
}

const initialState: EventsState = {
    events: [],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<EventData>) => {
            state.events.push(action.payload);
        },
        setEvents: (state, action: PayloadAction<EventData[]>) => {
            state.events = action.payload;
        },
    },
});

export const { addEvent, setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
