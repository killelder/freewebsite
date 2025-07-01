# Vue GitHub Pages 網站

這是一個使用 Vue 3 + Vite 建立的網站，可以自動部署到 GitHub Pages。

## 🚀 快速開始

### 1. 安裝相依套件
```bash
npm install
```

### 2. 本地開發
```bash
npm run dev
```

### 3. 建置專案
```bash
npm run build
```

## 📦 部署到 GitHub Pages

### 步驟 1: 推送程式碼到 GitHub

1. 在 GitHub 上建立一個新的 repository（建議命名為 `freewebsite`）
2. 將程式碼推送到 GitHub：

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/freewebsite.git
git push -u origin main
```

### 步驟 2: 啟用 GitHub Pages

1. 進入你的 GitHub repository
2. 點擊 **Settings** 標籤
3. 在左側選單中找到 **Pages**
4. 在 **Source** 部分選擇 **GitHub Actions**
5. 儲存設定

### 步驟 3: 等待部署完成

- 推送程式碼後，GitHub Actions 會自動開始建置和部署流程
- 你可以在 **Actions** 標籤中查看部署進度
- 部署完成後，你的網站將會在以下網址可用：
  ```
  https://你的用戶名.github.io/freewebsite/
  ```

## 🔧 專案結構

```
freewebsite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署設定
├── public/
│   └── vite.svg               # 靜態資源
├── src/
│   ├── assets/
│   │   └── vue.svg            # Vue logo
│   ├── components/
│   │   └── HelloWorld.vue     # 主要組件
│   ├── App.vue                # 根組件
│   ├── main.js                # 入口文件
│   └── style.css              # 全域樣式
├── index.html                 # HTML 模板
├── package.json               # 套件設定
├── vite.config.js             # Vite 設定
└── README.md                  # 說明文件
```

## ⚙️ 重要設定說明

### vite.config.js
```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/freewebsite/',  // 重要：必須與你的 repository 名稱一致
  build: {
    outDir: 'dist'
  }
})
```

**注意：** `base` 路徑必須與你的 GitHub repository 名稱一致。如果你的 repository 名稱不是 `freewebsite`，請相應修改這個設定。

## 🎯 自訂內容

### 修改網站內容
- 編輯 `src/components/HelloWorld.vue` 來修改主頁內容
- 編輯 `src/App.vue` 來修改整體布局
- 編輯 `src/style.css` 來修改樣式

### 修改網站標題
- 編輯 `index.html` 中的 `<title>` 標籤

### 新增頁面
- 在 `src/components/` 目錄下新增 Vue 組件
- 在 `src/App.vue` 中引入並使用新組件

## 🚨 故障排除

### 網站無法正常顯示
1. 檢查 `vite.config.js` 中的 `base` 設定是否與 repository 名稱一致
2. 確認 GitHub Pages 設定為使用 **GitHub Actions** 作為來源
3. 檢查 Actions 標籤中的部署日誌是否有錯誤

### 樣式或資源無法載入
- 確認所有資源路徑都是相對路徑
- 檢查 `public/` 目錄中的靜態資源是否正確

### 部署失敗
- 檢查 `package.json` 中的腳本是否正確
- 確認所有相依套件都已正確安裝
- 查看 GitHub Actions 的錯誤日誌

## 🔗 有用的連結

- [Vue 3 官方文件](https://vuejs.org/)
- [Vite 官方文件](https://vitejs.dev/)
- [GitHub Pages 說明文件](https://docs.github.com/en/pages)
- [GitHub Actions 說明文件](https://docs.github.com/en/actions)

## 📝 授權

MIT License