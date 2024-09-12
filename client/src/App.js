import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Features from "./pages/Features/Features";
import Navbar from './components/ui/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import "./assets/styles/App.css";
import { useState } from 'react';


function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route 
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
        />
        <Route 
          path="register" 
          element={<Register />} 
        />
        <Route 
          path="features" 
          element={<Features />} 
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route 
          path="*" 
          element={<Navigate to="/" />} 
        />
      </Routes>
    </Router>
  )
}
 
export default App;