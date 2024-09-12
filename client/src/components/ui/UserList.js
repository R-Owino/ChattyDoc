import React, { useState, useEffect } from 'react';

const UserList = ({ onSelectUser }) => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/user/get_users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse the JSON from the response
        } else {
          throw new Error('Expected JSON response');
        }
      })
      .then(data => {
        // Ensure data.users is an array
        if (Array.isArray(data.users)) {
          setUsers(data.users); // Set the users state with the fetched data
        } else {
          throw new Error('Invalid data format: users is not an array'); // Handle invalid data format
        }
      })
      .catch(error => console.error('Error fetching users:', error)); // Handle any errors
  }, []);

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li
            key={`${user.firstname}-${user.lastname}`} // Use a unique key for each list item
            onClick={() => onSelectUser(user)} // Pass the entire user object to the parent component
          >
            {user.firstname} {user.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;