import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({
  isConnected,
  serverUrl,
  volume,
  isMuted,
  onConnect,
  onDisconnect,
  onTestAlert,
  onServerUrlChange,
  onVolumeChange,
  onToggleMute
}) => {
  const handleConnect = () => {
    if (isConnected) {
      onDisconnect();
    } else {
      onConnect();
    }
  };

  return (
    <div className="control-panel panel">
      <h3>
        <i className="fas fa-cog"></i> 
        系統控制
      </h3>
      
      <div className="control-group">
        <button 
          className={`btn ${isConnected ? 'btn-warning' : 'btn-primary'}`}
          onClick={handleConnect}
        >
          <i className={`fas ${isConnected ? 'fa-unlink' : 'fa-plug'}`}></i>
          {isConnected ? '斷開連接' : '連接後端'}
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onTestAlert}
          disabled={!isConnected}
        >
          <i className="fas fa-volume-up"></i>
          測試警報
        </button>
        
        <button 
          className={`btn ${isMuted ? 'btn-secondary' : 'btn-warning'}`}
          onClick={onToggleMute}
        >
          <i className={`fas ${isMuted ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
          {isMuted ? '取消靜音' : '靜音'}
        </button>
      </div>
      
      <div className="settings">
        <div className="setting-item">
          <label htmlFor="volumeSlider">音量控制:</label>
          <input
            type="range"
            id="volumeSlider"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => onVolumeChange(e.target.value / 100)}
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
        
        <div className="setting-item">
          <label htmlFor="serverUrl">後端服務器地址:</label>
          <input
            type="text"
            id="serverUrl"
            value={serverUrl}
            onChange={(e) => onServerUrlChange(e.target.value)}
            placeholder="WebSocket URL"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
