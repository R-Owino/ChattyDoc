import React, { useState, useEffect, createContext, useCallback } from 'react';
import ChatWindow from './ChatWindow'; 
import MessageInput from './MessageInput'; 
import UserList from './UserList'; 
import '../../assets/styles/Chat.css'; 
import io from 'socket.io-client'; 

const SocketContext = createContext();

// Hook to manage socket connection, based on user information
const useSocket = (userInfo) => {
  const [socket, setSocket] = useState(null);

  // Effect to initialize and manage socket connection when `userInfo` changes
  useEffect(() => {
    if (userInfo) {
      const newSocket = io('http://localhost:5000', {
        query: { user_id: userInfo.email }, 
        transports: ['websocket'], 
      });

      newSocket.on('connect', () => console.log('Socket connected:', newSocket.id));

      newSocket.on('connect_error', (error) => console.error('Socket connection error:', error));

      newSocket.on('disconnect', () => console.log('Socket disconnected'));


      setSocket(newSocket);

      // Clean up the socket connection when the component unmounts or `userInfo` changes
      return () => newSocket.disconnect();
    }
  }, [userInfo]);

  return socket;
};

// Hook to manage fetching and updating chat messages
const useMessages = (selectedUser, socket) => {
  const [messages, setMessages] = useState([]); 

  // Fetch messages from the backend when a user is selected
  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return; 
    try {
      const token = sessionStorage.getItem('authToken'); 
      if (!token) throw new Error('JWT token not found');

      const response = await fetch(`http://localhost:5000/message/get_messages/${selectedUser.firstname}_${selectedUser.lastname}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json(); 
      setMessages((prevMessages) => ({
        ...prevMessages,
        [`${selectedUser.firstname}_${selectedUser.lastname}`]: data,
      }));

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [selectedUser]);

  // Fetch messages whenever `selectedUser` changes
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Handle incoming messages from the socket
  useEffect(() => {
    if (socket) {
      socket.on('message_received', (newMessage) => {
        if (!newMessage || !newMessage.text || !newMessage.sender) {
          console.error('Received message is invalid:', newMessage);
          return; 
        }
  
        // Construct the key for the sender based on their name
        const senderKey = `${newMessage.sender.firstname}_${newMessage.sender.lastname}`;
  
        // Update the messages state with the new message
        setMessages((prevMessages) => {
         
          const previousMessages = prevMessages[senderKey]?.messages || [];
  
          return {
            ...prevMessages,
            [senderKey]: {
              messages: [...previousMessages, newMessage] 
            }
          };
        });
      });
  
      // Cleanup the event listener when the component unmounts or the socket changes
      return () => socket.off('message_received');
    }
  }, [socket, setMessages]);
  

  return { messages, setMessages }; 
};

// Main Chat component that combines user selection, chat display, and sending messages
const Chat = ({ userInfo }) => {
  const socket = useSocket(userInfo);
  const [selectedUser, setSelectedUser] = useState(null);
  const { messages, setMessages } = useMessages(selectedUser, socket);

  // Function to send a new message
  const sendMessage = useCallback((text) => {
    if (selectedUser) { 
     
      const timestamp = new Date().toISOString();

      const newMessage = {
        text, 
        sender: { firstname: userInfo.firstName, lastname: userInfo.lastName },
        recipient: { firstname: selectedUser.firstname, lastname: selectedUser.lastname },
        timestamp,
      };
  
      // Key for the recipient based on their name
      const recipientKey = `${newMessage.recipient.firstname}_${newMessage.recipient.lastname}`;
  
  
      setMessages((prevMessages) => {
        const previousMessages = prevMessages[recipientKey]?.messages || [];
        
        return {
          ...prevMessages,
          [recipientKey]: {
            messages: [
              ...previousMessages, 
              { ...newMessage,}
            ]
          }
        };
      });
  
      
      socket.emit('send_message', newMessage);
    }
  }, [selectedUser, userInfo, socket, setMessages]);
   
  
  return (
    <SocketContext.Provider value={socket}> {/* Provide socket context to child components */}
      <div className="chat-container">
        <div className="user-list">
          <UserList onSelectUser={setSelectedUser} /> {/* Render the user list for selection */}
        </div>
        <div className="chat-area">
          {selectedUser ? ( // Show the chat if a user is selected
            <>
              <ChatWindow messages={messages[`${selectedUser.firstname}_${selectedUser.lastname}`] || []} /> {/* Display messages for selected user */}
              <MessageInput sendMessage={sendMessage} /> {/* Input for sending messages */}
            </>
          ) : (
            <div>Select a user to start chatting</div> // Message when no user is selected
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Chat; // Export the main Chat component
