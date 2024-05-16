import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, user: true };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });
      const botMessage = { text: response.data.response, user: false };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user ? 'user-message' : 'bot-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
