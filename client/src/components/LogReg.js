import React, { useState, useEffect } from 'react';
import './Logreg.css';

const Login = ({ handleLogin, handleSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [showForgotPasswordInputs, setShowForgotPasswordInputs] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      if (username.trim() === '' || password.trim() === '') {
        alert('Please enter a value in both username and password fields.');
        return;
      }
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (username === storedUsername && password === storedPassword) {
        handleLogin();
        setLoginFailed(false);
        localStorage.setItem('loggedInUsername', username); // Store username in localStorage
      } else {
        alert('Invalid username or password');
        setPassword('');
        setShowForgotPassword(true);
        setLoginFailed(true);
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '' || email.trim() === '' || phoneNumber.trim() === '') {
      alert('Please enter values in all fields.');
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    setSignupSuccess(true);
  };

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        setIsSigningUp(false);
        setSignupSuccess(false);
      }, 2000);
    }
  }, [signupSuccess]);

  const toggleSignup = () => {
    setIsSigningUp(!isSigningUp);
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordInputs(true);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot Password Form Submitted');
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    console.log('Phone:', phoneNumber);
    setNewPassword('');
    setConfirmNewPassword('');
    setPhoneNumber('');
    setShowForgotPasswordInputs(false);
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ width: '400px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {isSigningUp && (
              <div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">{isSigningUp ? 'Sign Up' : 'Login'}</button>
              {!isSigningUp && (
                <button type="button" className="btn btn-link p-0" onClick={toggleSignup}>Sign Up</button>
              )}
            </div>
          </form>
          {signupSuccess && (
            <div className="alert1">Signup successful! You can now login.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
