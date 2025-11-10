import React from 'react';
import './Header.css';

const Header = ({ isConnected }) => {
  return (
    <header className="header">
      <h1>
        <i className="fas fa-shield-alt"></i> 
        碰撞預警系統
      </h1>
      <div className="status-indicator">
        <span className={`status-dot ${isConnected ? 'online' : 'offline'}`}></span>
        <span>{isConnected ? '在線' : '離線'}</span>
      </div>
    </header>
  );
};

export default Header;
