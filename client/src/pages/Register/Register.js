import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import '../../assets/styles/register.css';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === 'firstName') {
      setFirstName(event.target.value);
    } else if (event.target.name === 'lastName') {
      setLastName(event.target.value);
    } else if (event.target.name === 'email') {
      setEmail(event.target.value);
      setEmailError('');
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
      setPasswordError('');
    } else if (event.target.name === 'confirmPassword') {
      setConfirmPassword(event.target.value);
      setConfirmPasswordError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (!validateEmail()) {
      return;
    }

    try {
      // Make a POST request to the register endpoint
      const response = await axios.post('http://localhost:5000/auth/register/', {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      console.log('Register Response:', response);

      if (response.status === 201) {
        // Registration successful, redirect to the login page
        navigate('/login');
      } else {
        console.log('Registration failed:', response.data.message);
        // Add your logic to display an error message or handle the error accordingly
      }
    } catch (error) {
      console.log('Error occurred while registering:', error.message);
      // Add your logic to display an error message or handle the error accordingly
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signin-container">
      <div className="signup-page">
        <h2>Register</h2>

        <form className="signup-form" onSubmit={handleFormSubmit}>
        <TextField
            name="firstName"
            label=" First Name"
            required
            fullWidth
            value={firstName}
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '100%' }}
          />

          <TextField
            name="lastName"
            label=" Last Name"
            required
            fullWidth
            value={lastName}
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            required
            fullWidth
            value={email}
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '100%' }}
            error={Boolean(email) && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)}
            helperText={emailError}
          />

          <TextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            required
            fullWidth
            value={password}
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '100%' }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            required
            fullWidth
            value={confirmPassword}
            onChange={handleChange}
            style={{ marginBottom: '10px', width: '100%' }}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="button-container">
            <Button type="submit" variant="contained" className="signup-button">
              Register
            </Button>
          </div>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;