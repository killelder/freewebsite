import { writeFileSync } from 'fs'
import { resolve } from 'path'

// 這個腳本會在建構時執行，生成 sitemap.xml
// 實際使用時，您需要替換成真實的網域名稱

const BASE_URL = 'https://yourdomain.com' // 請替換成您的實際網域

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/admin', priority: '0.3', changefreq: 'monthly' }
]

const currentDate = new Date().toISOString().split('T')[0]

// 如果您有靜態的文章資料，可以在這裡加入
// 或者從 localStorage 或其他來源讀取
const posts = []

const allPages = [...staticPages, ...posts]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

// 寫入 dist 目錄
const distPath = resolve(process.cwd(), 'dist', 'sitemap.xml')
writeFileSync(distPath, sitemapXml)

console.log('✅ Sitemap generated successfully!')