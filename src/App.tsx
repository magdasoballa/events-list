import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEventForm from './components/AddEventForm/AddEventForm';
import EventDetail from './components/EventDetail/EventDetail';
import EventsList from './components/EventsList/EventsList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/add-event" element={<AddEventForm />} />
      </Routes>
    </Router>
  );
};

export default App;
