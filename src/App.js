import React from 'react';
import Header from './components/Header';
import AlertPanel from './components/AlertPanel';
import ControlPanel from './components/ControlPanel';
import StatsPanel from './components/StatsPanel';
import LogPanel from './components/LogPanel';
import { useWebSocket } from './hooks/useWebSocket';
import { useAudio } from './hooks/useAudio';
import './App.css';

function App() {
  const {
    isConnected,
    alertData,
    stats,
    logs,
    serverUrl,
    setServerUrl,
    connect,
    disconnect,
    testAlert
  } = useWebSocket();

  const {
    volume,
    isMuted,
    setVolume,
    toggleMute,
    playAlert
  } = useAudio();

  // 當接收到警報時播放聲音
  React.useEffect(() => {
    if (alertData && !isMuted) {
      playAlert(alertData.level);
    }
  }, [alertData, isMuted, playAlert]);

  return (
    <div className="app">
      <div className="container">
        <Header isConnected={isConnected} />
          <main className="main-content">
          <div className="alert-section">
            <AlertPanel alertData={alertData} />
          </div>
          
          <div className="side-panels">
            <ControlPanel
              isConnected={isConnected}
              serverUrl={serverUrl}
              volume={volume}
              isMuted={isMuted}
              onConnect={connect}
              onDisconnect={disconnect}
              onTestAlert={testAlert}
              onServerUrlChange={setServerUrl}
              onVolumeChange={setVolume}
              onToggleMute={toggleMute}
            />
            
            <StatsPanel stats={stats} />
          </div>
          
          <div className="log-section">
            <LogPanel logs={logs} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
