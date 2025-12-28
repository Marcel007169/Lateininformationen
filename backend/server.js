const http = require('http');
const WebSocket = require('ws');

// Server erstellen
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Neuer Nutzer verbunden');
    ws.on('message', message => {
        console.log('Nachricht erhalten:', message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

// Render gibt den Port über process.env.PORT vor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
