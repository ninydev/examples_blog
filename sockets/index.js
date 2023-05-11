const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {createAdapter} = require('@socket.io/redis-adapter');
const {createClient} = require('redis');
const port = process.env.PORT || 3000;
const serverName = process.env.NAME || 'Unknown';
const redisHost = process.env.REDIS_SOCKET_HOST || 'redis.socket';
const redisPort = process.env.REDIS_SOCKET_PORT || 6379;

const pubClient = createClient({host: redisHost, port: redisPort});
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

server.listen(port, () => {
    console.log('Server listening at port %d', port);
    console.log('Hello, I\'m %s, how can I help?', serverName);
});


io.on('connection', socket => {

    socket.emit('my-name-is', serverName);

});