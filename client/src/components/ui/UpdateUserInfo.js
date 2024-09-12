import React, { useState, useEffect } from 'react';

const UpdateUserInfo = ({ userInfo, setUserInfo, userImage, setUserImage }) => {
  // State variables to store the form data
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const [bio, setBio] = useState(userInfo.bio);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Package the form data
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: bio
    };
    // Call onSave prop to save the changes
    setUserInfo(formData);

    
  };

  useEffect(() => {
    // Function to update user data
    const updateUserInfo = async () => {
      // Logic to update user data...
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('JWT token not found');
        }
        

        const userInfoJSON = JSON.stringify(userInfo);
        // console.log(userInfoJSON)
        

        // Fetch user info with JWT token
        const response = await fetch('http://localhost:5000/user/update_user_info', {
          method: 'POST',
          body: userInfoJSON,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to update user info');
        }
        } catch (error) {
          // Handle errors
          console.error('Error updating user info:', error);
        }
      };

    // Call updateUserData when userData changes
    updateUserInfo();
  }, [userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the input element
    const reader = new FileReader(); // Create a new instance of FileReader
  
    // Define an onload event handler for when the file is successfully loaded
    reader.onload = () => {
      // Set the image data to the result of FileReader's read operation
      setUserImage(reader.result);
    };
  
    // Define an onerror event handler for handling errors during file reading
    reader.onerror = () => {
      // Log an error message if there's an error reading the file
      console.error("Error occurred while reading the file.");
    };
  
    // Check if the file exists (is not null or undefined)
    if (file) {
      // Start reading the content of the specified file as a data URL
      reader.readAsDataURL(file);
    }
  };


  const handleImageUpload = async () => {
    
    const formData = new FormData();
    formData.append('image', userImage);


    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('JWT token not found');
    }

    try {
      const response = await fetch('http://localhost:5000/user/upload_image', {
        method: 'POST',
        
        headers: {
          Authorization: `Bearer ${token}`,
          enctype: "multipart/form-data"
        },
        body: formData,
        
      });
      if (response.ok) {
        alert('Profile picture updated successfully');
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

 


  return (
    <div className='user-container'>
      <div className='header-container'>
            <h2>Update Profile</h2>
      </div>
      <div>
        <h3>Change profile picture</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload</button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Change details</h3>
        <label htmlFor="firstName">First Name:</label>
        <input
          className='text-input' 
          type="text" 
          id="firstName" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        /><br/><br/>

        <label htmlFor="lastName">Last Name:</label>
        <input 
          className='text-input'
          type="text" 
          id="lastName" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        /><br/><br/>

        <div className='bio-input-container'>
          <label htmlFor="bio">About You:</label>
          <textarea
            
            className='bio-input'
            type="text" 
            id="bio" 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
          /><br/><br/>
        </div>
        

        <button type="submit">Save Changes</button>
      </form>
      <br/><br/>

   

    </div>
  );
}

export default UpdateUserInfo;