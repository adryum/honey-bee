// src/config/RedisClient.ts
import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL as string, // e.g., "redis://localhost:6379"
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('ready', () => console.log('Redis ready'));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Redis client connected');
  }
}