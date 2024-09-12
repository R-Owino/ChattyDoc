import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
  const chatWindowRef = useRef(null); // Create a reference to the chat window
  const [autoScroll, setAutoScroll] = useState(true); // Track if auto-scroll should happen

  // Ensure messagesArray is always an array
  const messagesArray = messages?.messages || [];


  // Scroll to the bottom if auto-scroll is enabled
  useEffect(() => {
    if (autoScroll && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messagesArray, autoScroll]); // Trigger when messagesArray or autoScroll changes

  // Detect when the user scrolls manually
  const handleScroll = () => {
    if (chatWindowRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatWindowRef.current;
      // If the user is near the bottom, enable auto-scroll
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false); // Disable auto-scroll if user scrolls up
      }
    }
  };

  return (
    <div 
      className="chat-window"
      ref={chatWindowRef}
      style={{ overflowY: 'auto', maxHeight: '400px' }}
      onScroll={handleScroll} // Add the scroll handler
    >
      {/* If there are no messages, show a friendly message */}
      {messagesArray.length === 0 ? (
        <p>No messages to display</p>
      ) : (
        // Render each message in the chat
        messagesArray.map((message, index) => (
          <Message key={index} message={message} />
        ))
      )}
    </div>
  );
};

export default ChatWindow;
