<template>
  <div class="admin">
    <h1>管理後台</h1>
    
    <!-- 檔案系統設定 -->
    <div v-if="isFileSystemSupported" class="file-system-section card">
      <h2>📁 本地檔案管理</h2>
      <div v-if="!hasDirectorySelected" class="directory-setup">
        <p>選擇一個本地資料夾來自動儲存您的文章：</p>
        <button @click="selectLocalDirectory" class="btn">選擇資料夾</button>
        <small>※ 需要 Chrome 86+ 或 Edge 86+ 瀏覽器支援</small>
      </div>
      <div v-else class="directory-selected">
        <p>✅ 已選擇本地資料夾，文章將自動儲存到該資料夾</p>
        <div class="directory-actions">
          <button @click="loadFromLocalFiles" class="btn btn-secondary">從本地載入</button>
          <button @click="resetLocalDirectory" class="btn btn-secondary">重新選擇資料夾</button>
        </div>
      </div>
    </div>
    
    <!-- 傳統檔案管理 -->
    <div v-if="!isFileSystemSupported || !hasDirectorySelected" class="traditional-section card">
      <h2>📄 檔案管理</h2>
      <p v-if="!isFileSystemSupported">您的瀏覽器不支援自動檔案儲存，請使用下載功能：</p>
      <p v-else>或者使用傳統的檔案下載方式：</p>
      <div class="traditional-actions">
        <button @click="downloadAllPosts" class="btn btn-secondary">下載所有文章</button>
      </div>
    </div>
    
    <div class="admin-actions">
      <button @click="showEditor = !showEditor" class="btn">
        {{ showEditor ? '取消新增' : '新增文章' }}
      </button>
    </div>
    
    <!-- 文章編輯器 -->
    <div v-if="showEditor" class="editor card">
      <h2>{{ editingPost ? '編輯文章' : '新增文章' }}</h2>
      
      <form @submit.prevent="savePost">
        <div class="form-group">
          <label for="title">標題</label>
          <input
            id="title"
            v-model="postForm.title"
            type="text"
            required
            placeholder="請輸入文章標題"
          />
        </div>
        
        <div class="form-group">
          <label for="slug">網址代碼 (slug)</label>
          <input
            id="slug"
            v-model="postForm.slug"
            type="text"
            required
            placeholder="article-url-slug"
          />
        </div>
        
        <div class="form-group">
          <label for="excerpt">摘要</label>
          <input
            id="excerpt"
            v-model="postForm.excerpt"
            type="text"
            placeholder="文章簡短摘要"
          />
        </div>
        
        <div class="form-group">
          <label for="content">內容 (Markdown)</label>
          <textarea
            id="content"
            v-model="postForm.content"
            placeholder="請使用 Markdown 格式撰寫文章..."
          ></textarea>
        </div>
        
        <div class="editor-actions">
          <button type="submit" class="btn">儲存文章</button>
          <button type="button" @click="previewPost" class="btn btn-secondary">預覽</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">重置</button>
        </div>
      </form>
    </div>
    
    <!-- 預覽區域 -->
    <div v-if="preview" class="preview card">
      <h2>預覽</h2>
      <article class="preview-content">
        <h1>{{ postForm.title }}</h1>
        <div class="markdown-content" v-html="preview"></div>
      </article>
    </div>
    
    <!-- 文章列表 -->
    <div class="posts-list">
      <h2>現有文章</h2>
      
      <div v-if="posts.length === 0" class="no-posts">
        <p>還沒有任何文章</p>
      </div>
      
      <div v-for="post in posts" :key="post.slug" class="post-item card">
        <div class="post-info">
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <small>{{ formatDate(post.date) }}</small>
        </div>
        <div class="post-actions">
          <button @click="editPost(post)" class="btn btn-secondary">編輯</button>
          <button @click="downloadPost(post)" class="btn btn-secondary">下載</button>
          <button @click="deletePost(post)" class="btn btn-secondary">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import type { BlogPost } from '../types/blog'

const blogStore = useBlogStore()
const posts = ref(blogStore.posts)

// 檔案系統支援檢查
const isFileSystemSupported = computed(() => blogStore.isFileSystemSupported())
const hasDirectorySelected = computed(() => blogStore.hasDirectorySelected())

onMounted(() => {
  blogStore.loadPosts()
})

const showEditor = ref(false)
const editingPost = ref<BlogPost | null>(null)
const preview = ref('')

const postForm = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  date: new Date().toISOString().split('T')[0]
})

function resetForm() {
  postForm.title = ''
  postForm.slug = ''
  postForm.excerpt = ''
  postForm.content = ''
  postForm.date = new Date().toISOString().split('T')[0]
  editingPost.value = null
  preview.value = ''
}

function editPost(post: BlogPost) {
  editingPost.value = post
  postForm.title = post.title
  postForm.slug = post.slug
  postForm.excerpt = post.excerpt
  postForm.content = post.rawContent || ''
  postForm.date = post.date
  showEditor.value = true
}

async function savePost() {
  try {
    const post: BlogPost = {
      title: postForm.title,
      slug: postForm.slug,
      excerpt: postForm.excerpt,
      content: await blogStore.renderMarkdown(postForm.content),
      rawContent: postForm.content,
      date: postForm.date
    }
    
    if (editingPost.value) {
      await blogStore.updatePost(post)
    } else {
      await blogStore.addPost(post)
    }
    
    resetForm()
    showEditor.value = false
    alert('文章已儲存！')
  } catch (error) {
    alert('儲存失敗：' + error)
  }
}

async function previewPost() {
  if (postForm.content) {
    preview.value = await blogStore.renderMarkdown(postForm.content)
  }
}

function deletePost(post: BlogPost) {
  if (confirm(`確定要刪除文章「${post.title}」嗎？`)) {
    blogStore.deletePost(post.slug)
  }
}

function downloadPost(post: BlogPost) {
  blogStore.downloadMarkdownFile(post)
}

function downloadAllPosts() {
  if (confirm('確定要下載所有文章嗎？')) {
    blogStore.downloadAllPosts()
  }
}

// 本地檔案系統管理
async function selectLocalDirectory() {
  try {
    const success = await blogStore.selectDirectory()
    if (success) {
      alert('資料夾選擇成功！現在儲存文章時會自動儲存到該資料夾。')
    } else {
      alert('資料夾選擇取消或失敗。')
    }
  } catch (error) {
    alert('選擇資料夾時發生錯誤：' + error)
  }
}

async function loadFromLocalFiles() {
  try {
    await blogStore.loadPostsFromFileSystem()
    alert('從本地檔案載入完成！')
  } catch (error) {
    alert('載入本地檔案時發生錯誤：' + error)
  }
}

function resetLocalDirectory() {
  if (confirm('確定要重新選擇資料夾嗎？這會清除目前的資料夾設定。')) {
    blogStore.resetDirectory()
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-TW')
}
</script>

<style scoped>
.admin h1 {
  margin-bottom: 2rem;
}

.admin-actions {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.editor {
  margin-bottom: 2rem;
}

.editor h2 {
  margin-bottom: 1.5rem;
}

.editor-actions {
  display: flex;
  gap: 1rem;
}

.preview {
  margin-bottom: 2rem;
}

.preview h2 {
  margin-bottom: 1rem;
  color: #666;
}

.preview-content {
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 4px;
  background: #fafafa;
}

.posts-list h2 {
  margin-bottom: 1.5rem;
}

.no-posts {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.post-info h3 {
  margin-bottom: 0.5rem;
}

.post-info p {
  color: #666;
  margin-bottom: 0.5rem;
}

.post-info small {
  color: #999;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.file-system-section,
.traditional-section {
  margin-bottom: 2rem;
}

.file-system-section h2,
.traditional-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.directory-setup,
.directory-selected {
  padding: 1rem 0;
}

.directory-setup p,
.directory-selected p {
  margin-bottom: 1rem;
}

.directory-setup small {
  color: #666;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
}

.directory-actions,
.traditional-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.directory-selected p {
  color: #059669;
  font-weight: 500;
}
</style>