import React from 'react';

const Message = ({ message }) => {
  const { sender, text, timestamp } = message;
  const senderName = `${sender.firstname} ${sender.lastname}`;

  return (
    <div className="message">
      <span className="message-avatar">{senderName.charAt(0)}</span>
      <div className="message-content">
        <span className="message-sender">{senderName}</span>
        <span className="message-text">{text}</span>
        <span className="message-timestamp">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Message;