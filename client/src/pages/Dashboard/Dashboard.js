
import React, { useState, useEffect } from 'react'
import SideBar from '../../components/ui/Sidebar'
import Chat from '../../components/ui/Chat';
import Notifications from '../../components/ui/Notifications'
import Contacts from '../../components/ui/Contacts'
import "../../assets/styles/dashboard.css";
import HomeDashboard from './HomeDashboard';
import Profile from '../../components/ui/Profile';
import onlineDoctor from "../../assets/images/user_icon_001.jpg";


const Dashboard = () => {
  //State for selecting component to display beside the SideBar
  // Default set to 'dashboardHome'
  const [selectedComponent, setSelectedComponent] = useState('homeDashboard');

  // State for the user info
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
  });

  const { firstName, lastName, email, bio } = userInfo;

  const [userImage, setUserImage] = useState(onlineDoctor);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get JWT token from localStorage
        const token = sessionStorage.getItem('authToken');

        if (!token) {
          throw new Error('JWT token not found');
        }

        // Fetch user info with JWT token
        const response = await fetch('http://localhost:5000/user/get_user_info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        
        setUserInfo(data)

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);


  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('JWT token not found');
        }
        console.log(token)

        // Fetch image with JWT token
        const response = await fetch('http://localhost:5000/user/get_image', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageBlop = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlop)
        setUserImage(imageUrl)
        
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);


  return (
    <div className='dashboard-container'>

      <SideBar
        setSelectedComponent={setSelectedComponent}
        userImage={userImage}
      />
      {/* Conditional rendering to render the selectedComponent.*/}
      {selectedComponent === 'profile' && <Profile userInfo={userInfo } 
                                                    setUserInfo={setUserInfo} 
                                                    userImage={userImage} 
                                                    setUserImage={setUserImage}
                                                    />}
      {selectedComponent === 'chat' && <Chat userInfo={userInfo } />}
      {selectedComponent === 'contacts' && <Contacts />}
      {selectedComponent === 'notifications' && <Notifications />}
      {selectedComponent === 'homeDashboard' && <HomeDashboard firstName={firstName} />}  
     
    </div>
  )
}

export default Dashboard
