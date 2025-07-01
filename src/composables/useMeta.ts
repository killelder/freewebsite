import { watchEffect } from 'vue'
import type { BlogMeta } from '../types/blog'

export function useMeta(meta: BlogMeta) {
  watchEffect(() => {
    // 設定頁面標題
    if (meta.title) {
      document.title = `${meta.title} | 我的部落格`
    }
    
    // 設定描述
    if (meta.description) {
      updateMetaTag('description', meta.description)
    }
    
    // 設定關鍵字
    if (meta.keywords && meta.keywords.length > 0) {
      updateMetaTag('keywords', meta.keywords.join(', '))
    }
    
    // Open Graph tags
    if (meta.title) {
      updateMetaTag('og:title', meta.title, 'property')
    }
    
    if (meta.description) {
      updateMetaTag('og:description', meta.description, 'property')
    }
    
    updateMetaTag('og:type', 'article', 'property')
    updateMetaTag('og:url', window.location.href, 'property')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary', 'name')
    if (meta.title) {
      updateMetaTag('twitter:title', meta.title, 'name')
    }
    if (meta.description) {
      updateMetaTag('twitter:description', meta.description, 'name')
    }
  })
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`)
  
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  
  tag.setAttribute('content', content)
}