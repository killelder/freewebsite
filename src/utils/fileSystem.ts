// 檔案系統 API 工具
// 注意：這個 API 目前只在 Chrome 86+ 和 Edge 86+ 支援

export interface FileSystemAPI {
  showDirectoryPicker(): Promise<FileSystemDirectoryHandle>
  showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>
}

export interface SaveFilePickerOptions {
  suggestedName?: string
  types?: Array<{
    description: string
    accept: Record<string, string[]>
  }>
}

declare global {
  interface Window {
    showDirectoryPicker?: FileSystemAPI['showDirectoryPicker']
    showSaveFilePicker?: FileSystemAPI['showSaveFilePicker']
  }
}

export class LocalFileManager {
  private directoryHandle: FileSystemDirectoryHandle | null = null
  
  // 檢查瀏覽器是否支援檔案系統 API
  static isSupported(): boolean {
    return 'showDirectoryPicker' in window
  }
  
  // 選擇本地資料夾
  async selectDirectory(): Promise<boolean> {
    if (!LocalFileManager.isSupported()) {
      throw new Error('瀏覽器不支援檔案系統 API')
    }
    
    try {
      this.directoryHandle = await window.showDirectoryPicker!()
      // 儲存資料夾參考到 localStorage
      localStorage.setItem('blog-directory-selected', 'true')
      return true
    } catch (error) {
      console.error('選擇資料夾失敗:', error)
      return false
    }
  }
  
  // 儲存文章到本地檔案
  async savePost(filename: string, content: string): Promise<boolean> {
    if (!this.directoryHandle) {
      throw new Error('請先選擇資料夾')
    }
    
    try {
      // 建立或獲取檔案
      const fileHandle = await this.directoryHandle.getFileHandle(filename, {
        create: true
      })
      
      // 建立可寫入串流
      const writable = await fileHandle.createWritable()
      
      // 寫入內容
      await writable.write(content)
      await writable.close()
      
      return true
    } catch (error) {
      console.error('儲存檔案失敗:', error)
      return false
    }
  }
  
  // 讀取資料夾中的所有 markdown 檔案
  async loadPosts(): Promise<Array<{ filename: string, content: string }>> {
    if (!this.directoryHandle) {
      throw new Error('請先選擇資料夾')
    }
    
    const posts: Array<{ filename: string, content: string }> = []
    
    try {
      for await (const [name, handle] of this.directoryHandle.entries()) {
        if (handle.kind === 'file' && name.endsWith('.md')) {
          const file = await handle.getFile()
          const content = await file.text()
          posts.push({ filename: name, content })
        }
      }
      
      return posts
    } catch (error) {
      console.error('讀取檔案失敗:', error)
      return []
    }
  }
  
  // 檢查是否已選擇資料夾
  hasDirectorySelected(): boolean {
    return this.directoryHandle !== null || 
           localStorage.getItem('blog-directory-selected') === 'true'
  }
  
  // 重置資料夾選擇
  resetDirectory(): void {
    this.directoryHandle = null
    localStorage.removeItem('blog-directory-selected')
  }
}

// 備用方案：傳統檔案下載
export function downloadFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}