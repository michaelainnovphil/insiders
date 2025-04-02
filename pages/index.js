// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the messages from Firestore when the component mounts
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data.messages))
      .catch(err => console.error('Error fetching messages:', err));
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePostMessage = () => {
    if (message.trim()) {
      // Send the message to the server
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then(res => res.json())
        .then(() => {
          // Clear the message input and fetch new messages
          setMessage('');
          fetch('/api/messages')
            .then(res => res.json())
            .then(data => setMessages(data.messages))
            .catch(err => console.error('Error fetching messages:', err));
        })
        .catch(err => console.error('Error posting message:', err));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Insider</h1>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message"
        rows="4"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={handlePostMessage}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Post Message
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>Messages</h2>
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          {messages.map((msg) => (
            <li key={msg.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
              {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
