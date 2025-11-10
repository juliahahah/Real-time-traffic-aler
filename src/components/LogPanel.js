import React from 'react';
import './LogPanel.css';

const LogPanel = ({ logs }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('zh-TW');
  };

  return (
    <div className="log-panel panel">
      <h3>
        <i className="fas fa-list"></i> 
        警報日誌
      </h3>
      
      <div className="log-container">
        {logs.length === 0 ? (
          <div className="log-empty">暫無警報記錄</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`log-entry ${log.level}`}>
              <span className="log-message">{log.message}</span>
              <span className="log-time">{formatTime(log.timestamp)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogPanel;
