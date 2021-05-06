const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3001;
var eventData = JSON.parse(fs.readFileSync('events.json'));

app.use(cors());
app.use(express.json());

app.get('/events', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(eventData));
});

app.post('/events', function (req, res) {
    if (!req.body) {
        res.send(JSON.stringify(eventData));
        return;
    }
    eventData.events.push({ ...req.body, id: (eventData.events[eventData.events.length - 1].id + 1) });
    fs.writeFileSync('evets.json', JSON.stringify(eventData));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(eventData));
});

app.delete(`/events/:eventId`, function (req, res) {
    const eventId = req.params.eventId;
    eventData.events = eventData.events.filter(event => event.id != eventId)
    fs.writeFileSync('events.json', JSON.stringify(eventData));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(eventData))
})

app.listen(port, () => console.log('server started on port', port));

//console.log("server started");