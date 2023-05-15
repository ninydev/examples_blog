const serverName = process.env.NAME || 'Node Notifications';
const port = process.env.PORT || 3000;
const redisSocketHost = process.env.REDIS_SOCKET_HOST || 'redis.socket';
const redisSocketPort = process.env.REDIS_SOCKET_PORT || 6379;

const { Emitter } = require("@socket.io/redis-emitter");
const { createClient } = require("redis");

const connect = async () => {
    const redisClient = createClient({  url: `redis://${redisSocketHost}:${redisSocketPort}` });
    redisClient.on("connect", () => {
        console.log("connected");
    });


    await redisClient.connect();
    const io = new Emitter(redisClient);

    setInterval(() => {
        let d = new Date().toLocaleString()
        console.log('Ping: ' + d)
        io.emit("ping", d + " " + serverName)
    }, 5000);
};

connect().catch(console.error);