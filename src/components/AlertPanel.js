import React from 'react';
import './AlertPanel.css';

const AlertPanel = ({ alertData }) => {
  const getLevelText = (level) => {
    switch (level) {
      case 'critical': return '緊急';
      case 'warning': return '警告';
      case 'info': return '信息';
      default: return '正常';
    }
  };

  const renderAlertContent = () => {
    if (!alertData) {
      return (
        <div className="no-alert">
          <i className="fas fa-check-circle"></i>
          <p>系統正常運行中</p>
        </div>
      );
    }

    const { ttc, distance, speed, objects, message } = alertData;

    return (
      <>
        <div className="alert-details">
          <div className="alert-item">
            <div className="value">{ttc ? ttc.toFixed(2) + 's' : 'N/A'}</div>
            <div className="label">碰撞時間 (TTC)</div>
          </div>
          <div className="alert-item">
            <div className="value">{distance ? distance.toFixed(1) + 'm' : 'N/A'}</div>
            <div className="label">距離</div>
          </div>
          <div className="alert-item">
            <div className="value">{speed ? speed.toFixed(1) + 'km/h' : 'N/A'}</div>
            <div className="label">速度</div>
          </div>
          <div className="alert-item">
            <div className="value">{objects ? objects.length : 0}</div>
            <div className="label">偵測物體</div>
          </div>
        </div>
        <div className="alert-message">
          {message}
        </div>
      </>
    );
  };

  const alertLevel = alertData?.level || 'normal';

  return (
    <div className={`alert-panel panel ${alertLevel}`}>
      <div className="alert-header">
        <h2>
          <i className="fas fa-exclamation-triangle"></i> 
          警訊狀態
        </h2>
        <div className={`alert-level ${alertLevel}`}>
          {getLevelText(alertLevel)}
        </div>
      </div>
      <div className="alert-content">
        {renderAlertContent()}
      </div>
    </div>
  );
};

export default AlertPanel;
