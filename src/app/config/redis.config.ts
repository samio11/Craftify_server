import { createClient } from "redis";
import config from ".";

const redisClient = createClient({
  username: config.RedisUserName,
  password: config.RedisPassword,
  socket: {
    host: config.RedisHost,
    port: Number(config.RedisPort),
  },
});

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export const redisConnection = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis is Connected");
  }
};
