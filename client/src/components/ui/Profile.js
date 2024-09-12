import React, { useState } from 'react'
import "../../assets/styles/profile.css";
import UserInfo from './UserInfo';
import UpdateUserInfo from './UpdateUserInfo';

const Profile = ({userInfo, setUserInfo, userImage, setUserImage}) => {
  
  return (
    <div className='profile-container'>
      <div className='user-info-container'>
        <UserInfo
          userInfo={userInfo}
          userImage={userImage}
        />
      </div>
      <div className='update-info-container'>
        <UpdateUserInfo
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      </div>
    </div>
  )
}

export default Profile