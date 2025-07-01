import type { BlogPost } from '../types/blog'

export function generateSitemap(posts: BlogPost[], baseUrl: string = 'https://yourdomain.com'): string {
  const currentDate = new Date().toISOString().split('T')[0]
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/admin', priority: '0.3', changefreq: 'monthly' }
  ]
  
  const postPages = posts.map(post => ({
    url: `/post/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.date
  }))
  
  const allPages = [...staticPages, ...postPages]
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  return sitemapXml
}

export function generateRobotsTxt(baseUrl: string = 'https://yourdomain.com'): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`
}