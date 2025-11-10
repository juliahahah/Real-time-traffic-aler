import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [serverUrl, setServerUrl] = useState('ws://localhost:8081');
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    criticalAlerts: 0,
    uptime: 0,
    lastAlert: null
  });

  const ws = useRef(null);
  const startTime = useRef(new Date());
  const alertClearTimeout = useRef(null);

  // 更新運行時間
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        uptime: new Date() - startTime.current
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 添加日誌
  const addLog = useCallback((message, level = 'info') => {
    const logEntry = {
      message,
      level,
      timestamp: new Date()
    };
    
    setLogs(prevLogs => {
      const newLogs = [logEntry, ...prevLogs];
      return newLogs.slice(0, 50); // 限制日誌數量
    });
  }, []);

  // 處理警報數據
  const handleAlert = useCallback((data) => {
    setAlertData(data);
    
    // 更新統計
    setStats(prevStats => ({
      ...prevStats,
      totalAlerts: prevStats.totalAlerts + 1,
      criticalAlerts: data.level === 'critical' 
        ? prevStats.criticalAlerts + 1 
        : prevStats.criticalAlerts,
      lastAlert: new Date().toLocaleTimeString('zh-TW')
    }));

    // 添加日誌
    addLog(data.message, data.level);

    // 清除警報超時
    if (alertClearTimeout.current) {
      clearTimeout(alertClearTimeout.current);
    }

    // 5秒後清除警報
    alertClearTimeout.current = setTimeout(() => {
      setAlertData(null);
    }, 5000);
  }, [addLog]);
  // 連接 WebSocket
  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      addLog('正在連接到後端服務器...', 'info');
      ws.current = new WebSocket(serverUrl);

      ws.current.onopen = () => {
        setIsConnected(true);
        addLog('✅ 已成功連接到後端服務器', 'info');
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleAlert(data);
        } catch (error) {
          console.error('解析消息失敗:', error);
          addLog('⚠️ 接收到無效的消息格式', 'warning');
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket錯誤:', error);
        addLog('❌ 連接出現錯誤 - 請檢查服務器是否運行', 'critical');
      };

      ws.current.onclose = (event) => {
        setIsConnected(false);
        const reason = event.code === 1006 ? '服務器可能已停止' : '連接被正常關閉';
        addLog(`🔌 與後端服務器的連接已斷開 (${reason})`, 'warning');
      };

    } catch (error) {
      console.error('連接失敗:', error);
      addLog('❌ 連接失敗: ' + error.message, 'critical');
      setIsConnected(false);
    }
  }, [serverUrl, addLog, handleAlert]);

  // 斷開 WebSocket
  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
  }, []);

  // 測試警報
  const testAlert = useCallback(() => {
    const testData = {
      level: 'critical',
      message: '測試警報 - 偵測到前方障礙物',
      ttc: 2.5,
      distance: 15.3,
      speed: 45.0,
      objects: [
        { type: 'car', confidence: 0.95 },
        { type: 'person', confidence: 0.87 }
      ]
    };

    handleAlert(testData);
  }, [handleAlert]);

  // 清理
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (alertClearTimeout.current) {
        clearTimeout(alertClearTimeout.current);
      }
    };
  }, []);

  return {
    isConnected,
    alertData,
    stats,
    logs,
    serverUrl,
    setServerUrl,
    connect,
    disconnect,
    testAlert
  };
};
