const actionTypes = require('./clientActionType');
const status = require('./status');

const webSocketsServerPort = process.env.SOCKET_PORT || 3001;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});
// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = {
        client: connection,
        status: 'await',
    }
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            const msg = JSON.parse(message.utf8Data);
            switch (message.type) {
                case actionTypes.FIND_OPPONENT: {
                    for (let key in clients) {
                        const element = clients[key];
                        if (element.status == status.STT_SEARCHING && element.client != connection) {
                            // Lock thread
                            element.status = clients[userID].status = status.STT_INGAME;
                            element.oppoent=userID;
                            clients[userID].oppoent=key;
                            const newBattle = {
                                
                            }
                            element.client.sendUTF(JSON.stringify(newBattle));
                            connection.sendUTF(JSON.stringify(newBattle));
                            break;
                        }
                    }
                    break;
                }case actionTypes.CHOSE_POSITION:{
                    
                }
                default:
                    break;
            }

            connection.sendUTF(message.utf8Data);
        }
    });
});
