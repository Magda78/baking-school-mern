const WebSocket = require('ws');

const clients = new Set();

const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  return wss;
};

const broadcastAvailabilityUpdate = (data) => {
  const message = JSON.stringify({ type: 'availability', data });
  clients.forEach((client) => {
    client.send(message);
  });
};

module.exports = { initializeWebSocket, broadcastAvailabilityUpdate };
