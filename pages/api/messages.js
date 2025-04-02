// pages/api/messages.js
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    try {
      // Add the new message to Firestore
      await db.collection('messages').add({
        content: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error adding message:', error);
      res.status(500).json({ error: 'Failed to save message.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Retrieve all messages from Firestore
      const snapshot = await db.collection('messages').orderBy('timestamp', 'desc').get();
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
      }));

      res.status(200).json({ messages });
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
