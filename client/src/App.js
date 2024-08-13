// client/src/App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';
import LogReg from './components/LogReg';
import './App.css';
import CustomItemContext from './context/ItemContext';
import Logo from './components/Logo'
import Navbar from './components/Navbar';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    // Simulating login logic
    console.log('Login:', userData);
    // Assuming successful login, update isLoggedIn state
    setIsLoggedIn(true);
  };

  return (
    <CustomItemContext>
      
      <Logo/>
      <br></br>
      <br></br>
    
      {isLoggedIn ? (
        <div>
          <Header />
          <ProductList />
        </div>
      ) : (
        <LogReg  handleLogin={handleLogin} />
      )}
    </CustomItemContext>
  );
};

export default App;
