const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
const port = 3001;
let events = [];

const categories = ['Sport', 'Kultura', 'Zdrowie'];

for (let i = 1; i <= 50; i++) {
    events.push({
        id: i,
        title: `Event ${i}`,
        dateTime: `2024-07-${i < 10 ? '0' + i : i} 10:00`, 
        description: `Description of Event ${i}`,
        image: `https://placeimg.com/400/300/${i}`, 
        category: categories[i % categories.length],
        phoneNumber: `123-456-${i}`,
        email: `contact${i}@example.com`,
        location: `Location ${i}`
    });
}

app.get('/events', (req, res) => {
    res.json(events);
});

app.get('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(event => event.id === eventId);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
});

app.post('/events', (req, res) => {
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
