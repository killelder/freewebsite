import { defineStore } from 'pinia'
import { ref } from 'vue'
import { marked } from 'marked'
import matter from 'gray-matter'
import type { BlogPost } from '../types/blog'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  
  // 配置 marked
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  // 從 localStorage 載入文章
  function loadPosts() {
    const savedPosts = localStorage.getItem('blog-posts')
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts)
    }
  }
  
  // 儲存文章到 localStorage
  function savePosts() {
    localStorage.setItem('blog-posts', JSON.stringify(posts.value))
  }
  
  // 新增文章
  function addPost(post: BlogPost) {
    const existingIndex = posts.value.findIndex(p => p.slug === post.slug)
    if (existingIndex !== -1) {
      throw new Error('已存在相同 slug 的文章')
    }
    
    posts.value.unshift({
      ...post,
      date: post.date || new Date().toISOString().split('T')[0]
    })
    savePosts()
  }
  
  // 更新文章
  function updatePost(post: BlogPost) {
    const index = posts.value.findIndex(p => p.slug === post.slug)
    if (index !== -1) {
      posts.value[index] = post
      savePosts()
    }
  }
  
  // 刪除文章
  function deletePost(slug: string) {
    const index = posts.value.findIndex(p => p.slug === slug)
    if (index !== -1) {
      posts.value.splice(index, 1)
      savePosts()
    }
  }
  
  // 渲染 Markdown
  async function renderMarkdown(content: string): Promise<string> {
    return marked(content)
  }
  
  // 解析帶有 Front Matter 的 Markdown 文件
  function parseMarkdownFile(fileContent: string) {
    const { data, content } = matter(fileContent)
    return {
      frontMatter: data,
      content
    }
  }
  
  // 生成文章文件內容（包含 Front Matter）
  function generateMarkdownFile(post: BlogPost): string {
    const frontMatter = `---
title: "${post.title}"
date: ${post.date}
excerpt: "${post.excerpt}"
---

${post.rawContent || ''}`
    
    return frontMatter
  }
  
  // 匯出所有文章為 Markdown 文件
  function exportPostsAsMarkdown() {
    const exports: { [key: string]: string } = {}
    
    posts.value.forEach(post => {
      const filename = `${post.date}-${post.slug}.md`
      exports[filename] = generateMarkdownFile(post)
    })
    
    return exports
  }
  
  return {
    posts,
    loadPosts,
    addPost,
    updatePost,
    deletePost,
    renderMarkdown,
    parseMarkdownFile,
    generateMarkdownFile,
    exportPostsAsMarkdown
  }
})