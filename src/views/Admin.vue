<template>
  <div class="admin">
    <h1>管理後台</h1>
    
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
          <button @click="deletePost(post)" class="btn btn-secondary">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useBlogStore } from '../stores/blog'
import type { BlogPost } from '../types/blog'

const blogStore = useBlogStore()
const posts = ref(blogStore.posts)

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
</style>