import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEventForm from './components/AddEventForm/AddEventForm';
import EventDetail from './components/EventDetail/EventDetail';
import EventsList from './components/EventsList/EventsList';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/add-event" element={<AddEventForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
