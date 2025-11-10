import React from 'react';
import './StatsPanel.css';

const StatsPanel = ({ stats }) => {
  const formatUptime = (uptime) => {
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stats-panel panel">
      <h3>
        <i className="fas fa-chart-line"></i> 
        系統統計
      </h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.totalAlerts}</div>
          <div className="stat-label">總警報數</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.criticalAlerts}</div>
          <div className="stat-label">緊急警報</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">
            {formatUptime(stats.uptime)}
          </div>
          <div className="stat-label">運行時間</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">
            {stats.lastAlert || '無'}
          </div>
          <div className="stat-label">最後警報</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
