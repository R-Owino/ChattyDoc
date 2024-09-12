import React from "react";
import backgroundImage from "../../assets/images/home.avif";
import { Link } from "react-router-dom";
import "../../assets/styles/home.css";

const Home = () => {
    return (
        <div className="home-container">
            <img
                src={backgroundImage}
                alt="Background"
                className="background-image"
            />
            <div className="content-container">
                <h3 className="title">Medic Mkononi</h3>
                <div className="text-container">
                    <p className="typewriter">Revolutionizing healthcare communication in Kenya</p>
                    <p className="typewriter">
                        Connect with your doctor anytime, anywhere, save time and resources,
                        stay updated on your health progress and enjoy private and group conversations.
                    </p>
                </div>
                <Link to="/register" className="get-started-button">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Home;