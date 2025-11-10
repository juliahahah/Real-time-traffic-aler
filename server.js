console.log('🚀 正在啟動碰撞預警系統後端服務器...');

const WebSocket = require('ws');
const http = require('http');

// 創建 HTTP 服務器
const server = http.createServer((req, res) => {
  console.log(`📝 收到 HTTP 請求: ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>碰撞預警系統後端服務器</h1>
    <p>WebSocket 服務器正在運行於端口 8081</p>
    <p>前端應用請連接到: ws://localhost:8081</p>
    <p>狀態: <span style="color: green;">在線</span></p>
    <p>啟動時間: ${new Date().toLocaleString('zh-TW')}</p>
  `);
});

// 創建 WebSocket 服務器
const wss = new WebSocket.Server({ server });

// 存儲統計數據
let stats = {
  totalAlerts: 0,
  criticalAlerts: 0,
  startTime: Date.now(),
  lastAlert: null
};

wss.on('connection', (ws) => {
  console.log('📞 客戶端已連接');
  
  // 發送歡迎消息和初始統計數據
  ws.send(JSON.stringify({
    type: 'welcome',
    message: '已連接到碰撞預警系統後端',
    stats: {
      ...stats,
      uptime: Date.now() - stats.startTime
    }
  }));

  // 處理客戶端消息
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('📨 收到消息:', message);
      
      if (message.type === 'test') {
        // 處理測試警報請求
        const testAlert = {
          level: 'warning',
          message: '測試警報 - 系統運行正常',
          ttc: 3.0,
          distance: 25.0,
          speed: 35.0,
          objects: [{
            type: 'car',
            confidence: 0.95
          }],
          timestamp: Date.now()
        };
        
        // 更新統計
        stats.totalAlerts++;
        stats.lastAlert = Date.now();
        
        ws.send(JSON.stringify(testAlert));
        console.log('📤 發送測試警報');
      }
      
    } catch (error) {
      console.error('❌ 解析客戶端消息時出錯:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('📞 客戶端已斷開連接');
  });

  ws.on('error', (error) => {
    console.error('❌ WebSocket 錯誤:', error);
  });
});

// 服務器錯誤處理
wss.on('error', (error) => {
  console.error('❌ WebSocket 服務器錯誤:', error);
});

// 啟動服務器
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`\n🚀 碰撞預警系統後端服務器已啟動`);
  console.log(`📡 WebSocket 服務器: ws://localhost:${PORT}`);
  console.log(`🌐 HTTP 服務器: http://localhost:${PORT}`);
  console.log(`⏰ 啟動時間: ${new Date().toLocaleString('zh-TW')}`);
  console.log(`\n等待客戶端連接...`);
});

// 優雅關閉
process.on('SIGINT', () => {
  console.log('\n正在關閉服務器...');
  server.close(() => {
    console.log('服務器已關閉');
    process.exit(0);
  });
});
