// pages/api/messages.js
import fs from 'fs';
import path from 'path';

// Define file path where messages will be stored (in JSON format)
const messagesFilePath = path.join(process.cwd(), 'messages.json');

// Function to read messages from the file
const readMessages = () => {
  if (fs.existsSync(messagesFilePath)) {
    const data = fs.readFileSync(messagesFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Function to write messages to the file
const writeMessages = (messages) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages));
};

export default async (req, res) => {
  if (req.method === 'GET') {
    // Handle GET request: Retrieve messages
    const messages = readMessages();
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    // Handle POST request: Save a new message
    const { message } = req.body;

    if (message && message.trim()) {
      const messages = readMessages();
      messages.push({ content: message, timestamp: new Date().toISOString() });
      writeMessages(messages);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Message is required' });
    }
  }

  // Handle unsupported request method
  res.status(405).json({ error: 'Method Not Allowed' });
};
