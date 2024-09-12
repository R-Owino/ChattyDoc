import React from 'react'

const UserInfo = ({userInfo, userImage}) => {
  return (
    <div className='user-container'>
        <div className='header-container'>
            <h2>Profile</h2>
        </div>
        
        <div className='image-container'>
        <img
            src={userImage}
            alt="profile pic"
            className='profile-pic'
        />

        </div>
        <div className='user-details-container'>
           
            <div className='user-details'>
                <h4 className='info-key'>First Name</h4>
                <h4 className='info-value'>{ userInfo.firstName }</h4>

            </div>
            <div className='user-details'>
                <h4 className='info-key'>Last Name</h4>
                <h4 className='info-value'>{ userInfo.lastName }</h4>

            </div>
            <div className='user-details'>
                <h4 className='info-key'>Email</h4>
                <h4 className='info-value'>{userInfo.email}</h4>

            </div>
            <div className='bio-container'>
                <h4 className='about-container'>About You</h4>
                <div className='bio-details'>
                <h4 className='bio-value'>{ userInfo.bio }</h4>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default UserInfo