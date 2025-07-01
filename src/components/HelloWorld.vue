<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    
    <div class="content">
      <h2>🎉 成功部署到 GitHub Pages！</h2>
      <p>這是一個使用 Vue 3 + Vite 建立的簡單網站</p>
      
      <div class="features">
        <h3>✨ 特色功能：</h3>
        <ul>
          <li>🚀 使用 Vite 快速開發</li>
          <li>⚡ Vue 3 Composition API</li>
          <li>🔧 自動化 GitHub Actions 部署</li>
          <li>📱 響應式設計</li>
        </ul>
      </div>
      
      <button type="button" @click="count++">
        點擊次數: {{ count }}
      </button>
      
      <p class="read-the-docs">
        編輯 <code>src/App.vue</code> 來開始開發你的應用程式
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const count = ref(0)
    
    return {
      count
    }
  }
}
</script>

<style scoped>
.card {
  padding: 2em;
}

.content {
  max-width: 600px;
  margin: 0 auto;
}

.features {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 1.5em;
  margin: 2em 0;
}

.features ul {
  text-align: left;
  list-style: none;
  padding: 0;
}

.features li {
  margin: 0.5em 0;
  padding: 0.25em 0;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
  color: #42b883;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
  margin: 1em 0;
}

button:hover {
  background-color: #369870;
}

.read-the-docs {
  color: #888;
  margin-top: 2em;
}

code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.25em 0.5em;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
</style>