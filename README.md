# Vue.js 部落格系統

基於 Vue.js + TypeScript 的現代化部落格系統，具備完整的文章管理和SEO功能。

## ✨ 特色功能

- 📝 **Markdown 支援** - 使用 Markdown 格式撰寫文章
- 🎨 **現代化介面** - 響應式設計，支援各種裝置
- ⚡ **即時預覽** - 文章編輯時可即時預覽效果
- 🔍 **SEO 優化** - 自動生成 meta tags、Open Graph 等
- 💾 **本地儲存** - 文章資料儲存在瀏覽器本地
- 🚀 **自動部署** - GitHub Actions 自動化部署到 GitHub Pages

## 🛠️ 技術棧

- **前端框架**: Vue.js 3 + TypeScript
- **建構工具**: Vite
- **路由管理**: Vue Router
- **狀態管理**: Pinia
- **Markdown 解析**: marked + gray-matter
- **部署平台**: GitHub Pages

## 📦 安裝與使用

### 1. 安裝依賴
\`\`\`bash
npm install
\`\`\`

### 2. 開發模式
\`\`\`bash
npm run dev
\`\`\`
開發伺服器將啟動在 `http://localhost:5173`

### 3. 建構生產版本
\`\`\`bash
npm run build
\`\`\`

### 4. 預覽生產版本
\`\`\`bash
npm run preview
\`\`\`

## 📚 使用說明

### 管理文章
1. 前往 `/admin` 路由
2. 點擊「新增文章」按鈕
3. 填寫文章標題、網址代碼(slug)、摘要
4. 使用 Markdown 格式撰寫文章內容
5. 可使用「預覽」功能查看渲染效果
6. 點擊「儲存文章」完成發布

### Markdown 語法支援
- 標題：`# H1`, `## H2`, `### H3`
- 粗體：`**粗體文字**`
- 斜體：`*斜體文字*`
- 連結：`[連結文字](URL)`
- 圖片：`![替代文字](圖片URL)`
- 程式碼：`` `程式碼` `` 或 \`\`\`語言\\n程式碼區塊\\n\`\`\`
- 清單：`- 項目` 或 `1. 項目`

## 🚀 部署到 GitHub Pages

### 1. 建立 GitHub Repository
\`\`\`bash
# 推送到 GitHub
git remote add origin https://github.com/你的用戶名/你的repo名稱.git
git branch -M main
git push -u origin main
\`\`\`

### 2. 啟用 GitHub Pages
1. 前往 GitHub repository 設定頁面
2. 找到「Pages」選項
3. 選擇「GitHub Actions」作為部署來源
4. 推送代碼後將自動觸發部署

### 3. 設定自定義域名 (可選)
1. 在域名服務商設定 CNAME 記錄指向 `你的用戶名.github.io`
2. 修改 `.github/workflows/deploy.yml` 中的 `cname` 設定
3. 在 GitHub repository 設定中填入自定義域名

## 📱 響應式設計

此部落格系統完全支援響應式設計，在以下裝置上都能良好顯示：
- 🖥️ 桌面電腦
- 💻 筆記型電腦  
- 📱 平板電腦
- 📱 手機

## 🔧 自定義設定

### 修改網站標題和描述
編輯 `index.html` 和 `src/App.vue` 中的相關設定。

### 調整樣式
主要樣式檔案位於 `src/assets/main.css`，可根據需求進行客製化。

### 新增更多功能
- 文章分類功能
- 標籤系統
- 搜尋功能
- 留言系統
- RSS 訂閱

## 📄 授權條款

MIT License - 詳見 LICENSE 檔案

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

🤖 Generated with [Claude Code](https://claude.ai/code)