<template>
  <div class="home">
    <h1>最新文章</h1>
    
    <div v-if="posts.length === 0" class="no-posts">
      <p>還沒有任何文章。<RouterLink to="/admin">立即新增</RouterLink></p>
    </div>
    
    <article v-for="post in posts" :key="post.slug" class="post-preview card">
      <h2><RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink></h2>
      <div class="post-meta">
        <span>{{ formatDate(post.date) }}</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <RouterLink :to="`/post/${post.slug}`" class="read-more">閱讀更多</RouterLink>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const posts = ref(blogStore.posts)

onMounted(() => {
  blogStore.loadPosts()
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-TW')
}
</script>

<style scoped>
.home h1 {
  margin-bottom: 2rem;
  color: #333;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.post-preview h2 {
  margin-bottom: 0.5rem;
}

.post-preview h2 a {
  text-decoration: none;
  color: #333;
}

.post-preview h2 a:hover {
  color: #007acc;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-excerpt {
  margin-bottom: 1rem;
  color: #666;
}

.read-more {
  color: #007acc;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}
</style>