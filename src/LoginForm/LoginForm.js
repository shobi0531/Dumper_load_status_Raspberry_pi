import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    
    if (username === "Admin" && password === "admin123") {
      setError(""); 
      
      navigate('/content');
      alert("Login Succesfull!!!");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <div className='input-box'>
          <input type='text' placeholder='Username' name="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <FaLock className='icon' />
        </div>

        <div className='remember-forgot'>
          <Link to='#'>Forget Password</Link>
        </div>

        <button type='submit'>Login</button>

        <div className='register-link'>
          <p>Don't have an account? <Link to='#'>Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
