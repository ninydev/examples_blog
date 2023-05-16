/**
 * Установочные параметры для сокетов
 */
const port = process.env.PORT || 3000;
const serverName = process.env.NAME || 'Node Socket';
const redisSocketHost = process.env.REDIS_SOCKET_HOST || 'redis.socket';
const redisSocketPort = process.env.REDIS_SOCKET_PORT || 6379;

/**
 * Подключение необходимых модулей
 */
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const pubClient = createClient({ url: `redis://${redisSocketHost}:${redisSocketPort}` });
const subClient = pubClient.duplicate();
pubClient.on("connect", () => {
    console.log("pubs connected");
});

subClient.on("connect", () => {
    console.log("subs connected");
});


const io = new Server();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));

    io.on("connection", (socket) => {
        socket.emit('my-name-is', serverName);
        console.log("new: " + socket.handshake.address );

        socket.on("disconnect", data => {
            console.log("dis" + socket.handshake.address)
            console.log(data)
        })

    });
    io.listen(port);
});
