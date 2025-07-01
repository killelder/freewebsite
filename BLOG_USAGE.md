# 部落格使用說明

## 📝 文章管理工作流程

### 方法一：使用網頁介面 + 檔案管理

1. **撰寫文章**
   - 前往 `/admin` 管理後台
   - 點擊「新增文章」
   - 填寫標題、slug、摘要和內容
   - 點擊「儲存文章」

2. **自動下載**
   - 儲存文章後會自動下載 `.md` 檔案
   - 檔案格式：`YYYY-MM-DD-slug.md`

3. **加入 Git 版本控制**
   ```bash
   # 將下載的檔案移動到 posts/ 資料夾
   mv ~/Downloads/2025-07-01-my-article.md posts/
   
   # 加入 Git
   git add posts/2025-07-01-my-article.md
   git commit -m "新增文章: My Article"
   git push
   ```

### 方法二：直接編輯 Markdown 檔案

1. **建立文章檔案**
   ```bash
   # 在 posts/ 資料夾建立新檔案
   touch posts/2025-07-01-my-new-post.md
   ```

2. **編輯檔案內容**
   ```markdown
   ---
   title: "文章標題"
   date: 2025-07-01
   excerpt: "文章摘要"
   ---
   
   # 文章內容
   
   這裡是文章的 Markdown 內容...
   ```

3. **推送到 Git**
   ```bash
   git add posts/2025-07-01-my-new-post.md
   git commit -m "新增文章: My New Post"
   git push
   ```

## 📁 檔案結構

```
posts/
├── 2025-07-01-welcome-to-my-blog.md
├── 2025-07-01-markdown-guide.md
└── YYYY-MM-DD-your-post-slug.md
```

## 🔄 同步機制

- **本地開發**: 文章從 `posts/` 資料夾載入
- **生產環境**: 同樣從 `posts/` 資料夾載入
- **備用方案**: 如果檔案載入失敗，會從 localStorage 載入

## 🎯 最佳實踐

### 檔案命名規範
- 格式：`YYYY-MM-DD-slug.md`
- slug 使用英文和連字號
- 例如：`2025-07-01-my-first-post.md`

### Front Matter 格式
```yaml
---
title: "文章標題"
date: 2025-07-01
excerpt: "簡短摘要（建議 100-150 字）"
---
```

### Markdown 內容建議
- 使用清楚的標題階層（H1, H2, H3）
- 程式碼區塊記得標註語言
- 圖片使用相對路徑或 CDN
- 保持行文簡潔明瞭

## 🚀 部署流程

1. **本地測試**
   ```bash
   npm run dev
   # 檢查 http://localhost:5173
   ```

2. **建構測試**
   ```bash
   npm run build
   npm run preview
   ```

3. **推送部署**
   ```bash
   git add .
   git commit -m "新增文章或更新"
   git push
   ```

4. **自動部署**
   - GitHub Actions 會自動建構並部署
   - 約 2-5 分鐘後可在 GitHub Pages 看到更新

## 🛠️ 管理功能

### 管理後台功能
- ✅ 新增文章
- ✅ 編輯文章
- ✅ 預覽文章
- ✅ 刪除文章
- ✅ 下載單一文章
- ✅ 批次下載所有文章
- ✅ 從檔案重新載入

### 檔案管理
- **下載**: 每次儲存會自動下載 `.md` 檔案
- **批次下載**: 可一次下載所有文章
- **重新載入**: 從 `posts/` 資料夾重新載入文章

## 🔧 故障排除

### 文章沒有顯示
1. 檢查檔案是否在 `posts/` 資料夾
2. 檢查 Front Matter 格式是否正確
3. 檢查檔案命名是否符合規範
4. 嘗試重新整理頁面

### 部署後文章消失
1. 確保 `posts/` 資料夾已推送到 Git
2. 檢查 `.gitignore` 沒有排除 `.md` 檔案
3. 檢查 GitHub Actions 建構日誌

### 本地開發問題
```bash
# 重新安裝依賴
npm ci

# 清除快取
npm run build

# 重啟開發伺服器
npm run dev
```

## 📚 進階功能

### 自訂域名
1. 修改 `.github/workflows/deploy.yml` 中的 `cname` 設定
2. 在域名服務商設定 CNAME 記錄
3. 在 GitHub repository 設定中配置自訂域名

### SEO 優化
- 每篇文章自動生成 meta tags
- 自動產生 sitemap.xml
- 支援 Open Graph 和 Twitter Cards

---

需要協助？請查看 GitHub Issues 或參考 README.md 文件。