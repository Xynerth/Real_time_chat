const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

var rooms = [];
var numRooms = 0;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is the About page.</p>');
});

app.get('/api/rooms', (req, res) => {
    console.log('Time is: ', Date.now());
    res.json(rooms);
})

app.post('/api/rooms', (req, res) => {
    if (!req.body.name || !req.body.name.trim()) {
        return res.status(400).json({ error: "'name' not given or empty. No room created." });
    }
    const newRoom = {id: numRooms + 1, name: req.body.name, createdAt: new Date()};
    numRooms = numRooms + 1;
    rooms.push(newRoom);
    res.status(201).json(newRoom);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><p>Feel free to reach out!</p>');
});
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});