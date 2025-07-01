import { defineStore } from 'pinia'
import { ref } from 'vue'
import { marked } from 'marked'
import matter from 'gray-matter'
import type { BlogPost } from '../types/blog'
import { LocalFileManager, downloadFile } from '../utils/fileSystem'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const fileManager = new LocalFileManager()
  
  // 配置 marked
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  // 從本地檔案系統載入文章
  async function loadPostsFromFileSystem() {
    try {
      const localPosts = await fileManager.loadPosts()
      const loadedPosts: BlogPost[] = []
      
      for (const { filename, content } of localPosts) {
        const { data, content: markdownContent } = matter(content)
        
        // 從檔案名提取 slug
        const slug = filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
        
        const post: BlogPost = {
          title: data.title || '無標題',
          slug: slug,
          excerpt: data.excerpt || '',
          content: await marked(markdownContent),
          rawContent: markdownContent,
          date: data.date || new Date().toISOString().split('T')[0]
        }
        
        loadedPosts.push(post)
      }
      
      posts.value = loadedPosts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      
      return true
    } catch (error) {
      console.error('從檔案系統載入失敗:', error)
      return false
    }
  }
  
  // 從 markdown 檔案載入文章（內建文章）
  async function loadPostsFromBundle() {
    try {
      // 載入所有 markdown 檔案
      const postModules = import.meta.glob('/posts/*.md', { as: 'raw' })
      const loadedPosts: BlogPost[] = []
      
      for (const path in postModules) {
        const content = await postModules[path]()
        const { data, content: markdownContent } = matter(content)
        
        // 從檔案路徑提取 slug
        const filename = path.split('/').pop()?.replace('.md', '') || ''
        const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '') // 移除日期前綴
        
        const post: BlogPost = {
          title: data.title || '無標題',
          slug: slug,
          excerpt: data.excerpt || '',
          content: await marked(markdownContent),
          rawContent: markdownContent,
          date: data.date || new Date().toISOString().split('T')[0]
        }
        
        loadedPosts.push(post)
      }
      
      // 按日期排序（最新的在前）
      posts.value = loadedPosts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      return true
    } catch (error) {
      console.error('載入內建文章失敗:', error)
      return false
    }
  }
  
  // 主要載入函數
  async function loadPosts() {
    // 1. 優先嘗試從本地檔案系統載入
    if (fileManager.hasDirectorySelected()) {
      const success = await loadPostsFromFileSystem()
      if (success) return
    }
    
    // 2. 載入內建文章
    const bundleSuccess = await loadPostsFromBundle()
    if (bundleSuccess) return
    
    // 3. 最後備用方案：從 localStorage 載入
    loadPostsFromLocalStorage()
  }
  
  // 從 localStorage 載入文章（備用方案）
  function loadPostsFromLocalStorage() {
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
  async function addPost(post: BlogPost) {
    const existingIndex = posts.value.findIndex(p => p.slug === post.slug)
    if (existingIndex !== -1) {
      throw new Error('已存在相同 slug 的文章')
    }
    
    const newPost = {
      ...post,
      date: post.date || new Date().toISOString().split('T')[0]
    }
    
    posts.value.unshift(newPost)
    savePosts()
    
    // 嘗試儲存到本地檔案系統
    const success = await savePostToFileSystem(newPost)
    if (!success) {
      // 如果無法儲存到檔案系統，就下載檔案
      downloadMarkdownFile(newPost)
    }
  }
  
  // 更新文章
  async function updatePost(post: BlogPost) {
    const index = posts.value.findIndex(p => p.slug === post.slug)
    if (index !== -1) {
      posts.value[index] = post
      savePosts()
      
      // 嘗試儲存到本地檔案系統
      const success = await savePostToFileSystem(post)
      if (!success) {
        // 如果無法儲存到檔案系統，就下載檔案
        downloadMarkdownFile(post)
      }
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
  
  // 儲存文章到本地檔案系統
  async function savePostToFileSystem(post: BlogPost): Promise<boolean> {
    if (!fileManager.hasDirectorySelected()) {
      return false
    }
    
    try {
      const filename = `${post.date}-${post.slug}.md`
      const content = generateMarkdownFile(post)
      return await fileManager.savePost(filename, content)
    } catch (error) {
      console.error('儲存到檔案系統失敗:', error)
      return false
    }
  }
  
  // 下載單一 Markdown 檔案
  function downloadMarkdownFile(post: BlogPost) {
    const filename = `${post.date}-${post.slug}.md`
    const content = generateMarkdownFile(post)
    downloadFile(filename, content)
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
  
  // 批次下載所有文章
  function downloadAllPosts() {
    posts.value.forEach(post => {
      setTimeout(() => downloadMarkdownFile(post), 100) // 加小延遲避免瀏覽器阻擋
    })
  }
  
  // 選擇本地資料夾
  async function selectDirectory(): Promise<boolean> {
    return await fileManager.selectDirectory()
  }
  
  // 檢查瀏覽器支援
  function isFileSystemSupported(): boolean {
    return LocalFileManager.isSupported()
  }
  
  // 檢查是否已選擇資料夾
  function hasDirectorySelected(): boolean {
    return fileManager.hasDirectorySelected()
  }
  
  // 重置資料夾選擇
  function resetDirectory(): void {
    fileManager.resetDirectory()
  }
  
  return {
    posts,
    loadPosts,
    loadPostsFromLocalStorage,
    loadPostsFromFileSystem,
    addPost,
    updatePost,
    deletePost,
    renderMarkdown,
    parseMarkdownFile,
    generateMarkdownFile,
    downloadMarkdownFile,
    exportPostsAsMarkdown,
    downloadAllPosts,
    selectDirectory,
    isFileSystemSupported,
    hasDirectorySelected,
    resetDirectory
  }
})