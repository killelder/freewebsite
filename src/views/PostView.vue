<template>
  <div class="post-view">
    <div v-if="post" class="post card">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span>發布於 {{ formatDate(post.date) }}</span>
        </div>
      </header>
      
      <div class="post-content markdown-content" v-html="post.content"></div>
      
      <footer class="post-footer">
        <RouterLink to="/" class="btn btn-secondary">← 返回首頁</RouterLink>
      </footer>
    </div>
    
    <div v-else class="not-found card">
      <h2>文章不存在</h2>
      <p>找不到您要查看的文章。</p>
      <RouterLink to="/" class="btn">返回首頁</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'

const props = defineProps<{
  slug: string
}>()

const blogStore = useBlogStore()

const post = computed(() => 
  blogStore.posts.find(p => p.slug === props.slug)
)

onMounted(() => {
  blogStore.loadPosts()
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-TW')
}

// SEO meta tags
import { useMeta } from '../composables/useMeta'
if (post.value) {
  useMeta({
    title: post.value.title,
    description: post.value.excerpt
  })
}
</script>

<style scoped>
.post-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.post-header h1 {
  margin-bottom: 0.5rem;
  color: #333;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
}

.post-content {
  margin-bottom: 2rem;
}

.post-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found h2 {
  margin-bottom: 1rem;
  color: #333;
}

.not-found p {
  margin-bottom: 2rem;
  color: #666;
}
</style>