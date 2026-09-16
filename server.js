const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

var rooms = [];
var numRooms = 0;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// General pages
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page!</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><p>Feel free to reach out!</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is the About page.</p>');
});

// Rooms
app.get('/api/rooms', (req, res) => {
    console.log('Time is: ', Date.now());
    res.json(rooms);
});

app.get('/api/rooms/:id', (req, res) => {
    const id = req.params.id;
    const index = rooms.findIndex(room => room.id == id);
    if (index == -1) {
        console.log(`Room ${id} not found`);
        return res.status(404).end();
    }
    return res.status(200).json(rooms[index]);
});

app.get('/api/rooms/:id/messages', (req, res) => {
    const id = req.params.id;
    const index = rooms.findIndex(room => room.id == id);
    if (index == -1) {
        return res.status(404).json({error: `room ${id} not found`});
    }
    return res.status(200).json(rooms[index].messages);
});

app.delete('/api/rooms/:id', (req, res) => {
    const id = req.params.id;
    const index = rooms.findIndex(room => room.id == id);
    if (index == -1) {
        return res.status(404).json({error: "room not found"});
    }
    rooms.splice(index, 1);
    return res.status(204).end();
});

app.post('/api/rooms', (req, res) => {
    if (!req.body.name || !req.body.name.trim()) {
        return res.status(400).json({ error: "'name' not given or empty. No room created." });
    }
    const newRoom = {
        id: rooms.length + 1, 
        name: req.body.name, 
        createdAt: new Date(),
        messages:[]};
    numRooms = numRooms + 1;
    rooms.push(newRoom);
    res.status(201).json(newRoom);
});

//Start server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});