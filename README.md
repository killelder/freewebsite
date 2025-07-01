# 生活故事 - 靜態部落格

這是一個受到 Humans of New York 風格啟發的靜態部落格，使用 Vue 3 + Vite 建立，可以自動部署到 GitHub Pages。

## ✨ 特色

- 🎨 **HONY 風格設計**：簡潔優雅的攝影風格部落格
- 📖 **故事導向**：專注於人物故事和生活片段的敘述
- 📱 **響應式設計**：完美適配手機和桌面端
- 🚀 **自動部署**：推送到 GitHub 即自動部署到 GitHub Pages
- 🖼️ **圖片優先**：高品質圖片展示，搭配動人的文字敘述

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
git commit -m "Create HONY-style blog with Vue 3"
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
│   │   ├── HeroSection.vue    # 主要特色文章組件
│   │   └── ArticleGrid.vue    # 文章網格列表組件
│   ├── App.vue                # 根組件（包含導航和布局）
│   ├── main.js                # 入口文件
│   └── style.css              # 全域樣式（HONY 風格）
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

### 修改部落格內容
- 編輯 `src/components/HeroSection.vue` 來修改主要特色文章
- 編輯 `src/components/ArticleGrid.vue` 來新增/修改文章列表
- 編輯 `src/App.vue` 來修改導航和整體布局
- 編輯 `src/style.css` 來調整 HONY 風格樣式

### 新增文章
在 `ArticleGrid.vue` 的 `articles` 陣列中新增文章：
```javascript
{
  id: 7,
  title: '你的文章標題',
  excerpt: '"你的文章摘要或引言..."',
  image: '你的圖片 URL',
  location: '地點'
}
```

### 修改網站資訊
- 編輯 `index.html` 中的 `<title>` 和 `<meta>` 標籤
- 修改 `src/App.vue` 中的網站名稱和導航選單

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