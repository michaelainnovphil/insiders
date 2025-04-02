import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Update localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePostMessage = () => {
    if (message.trim()) {
      const updatedMessages = [message, ...messages];
      setMessages(updatedMessages);
      setMessage('');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundImage: 'url(https://f4.bcbits.com/img/a1613897873_16.jpg)', // Replace with your image URL
        backgroundSize: 'cover', // Ensures the image covers the entire container
        backgroundPosition: 'center', // Keeps the image centered
        minHeight: '100vh', // Makes sure the background covers the entire viewport height
      }}
    >
      <h1 style={{ color: 'white' }}>Insider</h1>

      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="hi"
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
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
