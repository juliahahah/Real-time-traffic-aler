# 碰撞預警系統 (Collision Warning System)

一個基於 React + WebSocket 的實時碰撞預警系統前端界面，專為接收和顯示 YOLOv8 + TTC（Time-to-Collision）偵測結果而設計。

## 📋 系統概述

本系統提供一個直觀、實用的前端界面，用於：
- 實時接收後端 YOLOv8 物體偵測數據
- 視覺化顯示碰撞風險評估結果
- 提供音頻警報和歷史記錄功能
- 支援系統狀態監控和統計

## ⚡ 快速開始

### 環境需求
- Node.js 16.0 或以上版本
- npm 或 yarn 套件管理器
- 現代瀏覽器（Chrome 60+, Firefox 55+, Safari 11+, Edge 79+）

### 安裝與啟動

1. **安裝相依套件**
```bash
npm install
```

2. **啟動後端服務器**
```bash
npm run server
# 或直接使用
node server.js
```

3. **啟動前端應用**
```bash
npm start
```

4. **一鍵啟動所有服務**
```bash
npm run dev
```

### 訪問應用
- **前端界面**: http://localhost:3000
- **後端服務**: http://localhost:8081
- **WebSocket**: ws://localhost:8081

## 🎯 核心功能

### 🚨 警報接收與顯示
- 實時接收 YOLOv8 偵測數據
- 視覺化顯示 TTC、距離、速度、偵測物體數
- 根據危險等級動態改變界面顏色（正常/警告/緊急）
- 自動清除過期警報

### 🔊 聲音警報系統
- 多層次聲音警報（緊急/警告/信息）
- 可調節音量控制（0-100%）
- 一鍵靜音功能
- 基於 Web Audio API 的自定義音效

### 📊 實時監控
- WebSocket 連接狀態監控
- 警報統計信息（總數、緊急數）
- 系統運行時間計時
- 最後警報時間追蹤

### 🎛️ 系統控制
- WebSocket 連接/斷開管理
- 手動測試警報功能
- 自定義服務器地址設定
- 響應式設計，支援各種裝置

### 📜 日誌系統
- 實時警報歷史記錄
- 時間戳與等級標示
- 自動滾動與容量管理
- 不同等級的視覺標示

## 📊 數據格式

系統接收的警報數據格式：

```json
{
  "level": "critical|warning|info",
  "message": "警報描述信息",
  "ttc": 2.5,
  "distance": 15.3,
  "speed": 45.0,
  "objects": [
    {
      "type": "car|person|bicycle",
      "confidence": 0.95
    }
  ]
}
```

## ⚙️ 系統架構

### 前端技術棧
- **React 18**: 現代化用戶界面框架
- **WebSocket API**: 實時數據通信
- **Web Audio API**: 聲音警報系統
- **CSS Grid/Flexbox**: 響應式布局
- **ES6+ JavaScript**: 現代 JavaScript 特性

### 後端組件
- **Node.js**: 服務器運行環境
- **WebSocket Server**: 實時數據傳輸
- **HTTP Server**: 健康檢查和狀態頁面
- **模擬數據生成器**: 用於測試的警報數據

### 系統組件結構
```
src/
├── components/          # React 組件
│   ├── Header.js       # 頂部狀態欄
│   ├── AlertPanel.js   # 主要警報顯示面板
│   ├── ControlPanel.js # 系統控制面板
│   ├── StatsPanel.js   # 統計信息面板
│   └── LogPanel.js     # 日誌顯示面板
├── hooks/              # 自定義 React Hooks
│   ├── useWebSocket.js # WebSocket 連接管理
│   └── useAudio.js     # 音頻播放管理
└── App.js              # 主應用組件
```

## 與您的後端集成

### WebSocket 連接
```javascript
// 連接到您的後端服務器
const websocket = new WebSocket('ws://your-backend-server:port');

// 發送警報數據
websocket.send(JSON.stringify({
  level: 'critical',
  message: '前方偵測到障礙物',
  ttc: 1.8,
  distance: 12.5,
  speed: 50.0,
  objects: [{type: 'car', confidence: 0.92}]
}));
```

### YOLO 偵測結果整合
系統設計用於接收 YOLOv8 的偵測結果，並結合 TTC 計算提供預警。您的後端需要：

1. 處理 YOLO 偵測數據
2. 計算 Time-to-Collision (TTC)
3. 通過 WebSocket 發送格式化的警報數據

## 🚀 使用步驟

### 第一次使用
1. **安裝並啟動**：執行 `npm install` 後運行 `npm run dev`
2. **開啟前端**：瀏覽器訪問 `http://localhost:3000`
3. **連接後端**：點擊「連接後端」按鈕
4. **測試功能**：點擊「測試警報」按鈕驗證系統運作

### 日常使用
1. **啟動系統**：運行 `npm run dev` 或分別啟動前後端
2. **監控狀態**：查看連線狀態指示器（綠色=已連線）
3. **接收警報**：系統自動接收並顯示來自後端的警報
4. **調整設定**：根據需要調整音量或服務器地址

## 🔧 自定義配置

### 修改服務器地址
在「系統控制」面板中修改「後端服務器地址」欄位，連接到您的實際後端系統

### 調整警報參數
- **音量控制**：使用滑塊調節警報音量（0-100%）
- **靜音功能**：一鍵開關聲音警報
- **服務器設定**：修改 WebSocket 連接地址

## 🌐 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🛠️ 開發說明

### 項目結構
```
collision-warning-react/
├── public/
│   ├── index.html      # HTML 模板
│   └── manifest.json   # PWA 配置
├── src/
│   ├── components/     # React 組件
│   │   ├── Header.js   # 頭部組件
│   │   ├── AlertPanel.js # 警報面板
│   │   ├── ControlPanel.js # 控制面板
│   │   ├── StatsPanel.js # 統計面板
│   │   └── LogPanel.js # 日誌面板
│   ├── hooks/          # 自定義 Hooks
│   │   ├── useWebSocket.js # WebSocket 連接
│   │   └── useAudio.js # 音頻處理
│   ├── App.js          # 主應用組件
│   ├── App.css         # 全局樣式
│   ├── index.js        # React 入口點
│   └── index.css       # 基礎樣式
├── server.js           # 後端 WebSocket 服務器
├── package.json        # 項目配置
├── start-server.bat    # Windows 啟動腳本
└── README.md           # 文檔
```

### 腳本命令
```bash
npm start          # 啟動 React 開發服務器 (port 3000)
npm run server     # 啟動 WebSocket 後端服務器 (port 8081)
npm run dev        # 同時啟動前端和後端
npm run build      # 建置生產版本
npm test           # 執行測試
```

### 添加新功能
1. **新組件**: 在 `src/components/` 中創建新的 React 組件
2. **新功能**: 在 `src/hooks/` 中添加自定義 Hook
3. **樣式**: 為每個組件創建對應的 CSS 文件
4. **狀態管理**: 利用 React Hooks 進行狀態管理

## 🔧 故障排除

### 常見問題

**Q: 無法連接到後端服務器**
- 確保後端服務器正在運行 (`npm run server`)
- 檢查端口 8081 是否被其他程序占用
- 驗證防火牆設定

**Q: 前端應用無法啟動**
- 檢查 Node.js 版本是否符合要求
- 確保已正確安裝依賴 (`npm install`)
- 檢查端口 3000 是否可用

**Q: 聲音警報無法播放**
- 確保瀏覽器允許音頻播放
- 檢查系統音量設定
- 嘗試點擊頁面後再測試（某些瀏覽器需要用戶交互）

## 📝 許可證

MIT License - 詳見 LICENSE 文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案！

## 📞 支援

如需技術支援，請在 GitHub 上建立 Issue。
