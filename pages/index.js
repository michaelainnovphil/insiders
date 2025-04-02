import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages from the API when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePostMessage = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        if (response.ok) {
          setMessages([{ content: message }, ...messages]);
          setMessage('');
        }
      } catch (error) {
        console.error("Error posting message: ", error);
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundImage: 'url(https://f4.bcbits.com/img/a1613897873_16.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: 'white' }}>Insider</h1>

      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Write a message"
        rows="4"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />

      <button
        onClick={handlePostMessage}
        style={{
          padding: '10px 20px',
          backgroundColor: '#603875',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        Post Message
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: 'white' }}>Messages</h2>
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          {messages.map((msg, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#fff',
              }}
            >
              {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
