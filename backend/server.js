const http = require('http');
const WebSocket = require('ws');

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

server.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
