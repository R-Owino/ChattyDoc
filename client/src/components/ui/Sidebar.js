import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import "../../assets/styles/sidebar.css";


const SideBar = ({ setSelectedComponent, userImage }) => {
    // State for tracking the selected menu
    const [selectedMenuItem, setSelectedMenuItem] = useState('');

    const handleMenuItemClick = (component) => {
      setSelectedMenuItem(component);
      setSelectedComponent(component);
    };

    const handleLogout = () =>{
      // Clear token from local storage
  
      localStorage.removeItem('jwtToken'); 

      // Reload page to navigate to login
      window.location.reload();

    }
    

    return (
      <div className="sidebar-container">
       <Sidebar className="sidebar">
          <Menu>
              <div
                onClick={() => handleMenuItemClick('profile')}
                className="user-profile"
              >
                <img
                  src={userImage}
                  alt="profile pic"
                  className='profile-pic'
                />
                
              </div>
              <MenuItem 
                onClick={() => handleMenuItemClick('homeDashboard')} 
                icon={<GridViewOutlinedIcon />}
                className={selectedMenuItem === 'homeDashboard' ? 'selected' : ''}
              >
                HOME 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('chat')} 
                icon={<ChatBubbleOutlineOutlinedIcon />}
                className={selectedMenuItem === 'chat' ? 'selected' : ''}
              > 
                CHAT 
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('profile')} 
                icon={<PersonOutlinedIcon />}
                className={selectedMenuItem === 'profile' ? 'selected' : ''}
              >
                PROFILE 
              </MenuItem>
              <MenuItem 
                icon={<PowerSettingsNewOutlinedIcon />}
                onClick={handleLogout}
              > 
                LOGOUT 
              </MenuItem>
            </Menu>
        </Sidebar>
      </div> 
    );
  };
  export default SideBar;