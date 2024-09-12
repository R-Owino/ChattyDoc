import React from 'react'
import onlineDoctor from "../../assets/images/dashboard 1.png";

const WelcomeMessage = ({firstName}) => {
    // Getting the current date in Kenya
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-KE', options);

    return (
        <div className="welcome-message-container">
            <div className='welcome-message'>
                <div className="welcome-message-text">
                    <p> Hello {firstName}. How are you feeling today?</p> 
                    <p style={{ fontStyle: 'italic' }}> Consult with a real doctor and much more on Chatty Doc</p>
                </div>
                <div>
                    <img src={onlineDoctor} alt="online doctor" className='online-doctor' />
                </div>    
            </div>
            <div className='date'>
                {formattedDate}
            </div>
        </div>
    )
}

export default WelcomeMessage