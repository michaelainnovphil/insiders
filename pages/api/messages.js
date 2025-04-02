// pages/api/messages.js
import Redis from 'ioredis';

const redis = new Redis({
  host: 'sought-leech-54593.upstash.io',  // Replace with your Upstash Redis URL
  port: 6379, // Default Redis port
  password: 'AdVBAAIjcDFkMzVmODAyNzM0NmQ0ZmI0ODAxODcwYjE4N2UzZDY5ZHAxMA', // Replace with your Upstash Redis token
  tls: {} // Enable TLS for secure connection
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve messages stored in Redis
      const messages = await redis.lrange('messages', 0, -1);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages from Redis' });
    }
  }

  if (req.method === 'POST') {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      // Add message to the Redis list
      await redis.lpush('messages', message);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error posting message to Redis' });
    }
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
