async function loadRooms() {
    const response = await fetch('http://localhost:4000/api/rooms');

    const rooms = await response.json();

    renderRooms(rooms);
}

function renderRooms(rooms) {
    const list = document.getElementById('room-list');
    list.replaceChildren();
    
    for (const room of rooms) {
        const entry = document.createElement("li");
        entry.textContent = room.name;
        list.appendChild(entry);
    }
}


document.getElementById('new-room-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('room-name-input').value;
    console.log(name);
    try {
        const response = await fetch('/api/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        }); 
        
        if (!response.ok) {
            throw new Error(`Failed to create room. Status: ${response.status}`);
        }

        loadRooms();
        document.getElementById('room-name-input').value = '';
    }
    catch (error) {
        console.error('Error during POST:', error);
    }
});

loadRooms();


