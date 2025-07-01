<template>
  <div id="app">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/" class="logo">我的部落格</RouterLink>
        <div class="nav-links">
          <RouterLink to="/">首頁</RouterLink>
          <RouterLink to="/admin">管理後台</RouterLink>
        </div>
      </nav>
    </header>
    
    <main class="main">
      <RouterView />
    </main>
    
    <footer class="footer">
      <p>&copy; 2025 我的部落格. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.header {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #007acc;
}

.main {
  min-height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background: #f8f9fa;
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>