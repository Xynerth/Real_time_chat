async function getRooms() {
    const response = await fetch('https://localhost:4000/api/rooms');

    const data = await response.json();

    console.log(data);
}

