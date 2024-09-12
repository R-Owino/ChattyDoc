import React, { useState } from 'react';

// Function component using arrow function syntax
const MessageInput = ({ sendMessage }) => {
  // State to track the input value
  const [input, setInput] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (input.trim()) {
      sendMessage(input); // Call sendMessage prop with the current input
      setInput(''); // Clear the input field
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      {/* Input field for typing messages */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      {/* Button to send the message */}
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;