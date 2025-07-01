<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="nav-brand">
            <h1><a href="#" class="brand-link">生活故事</a></h1>
          </div>
          <ul class="nav-menu">
            <li><a href="#" class="nav-link">首頁</a></li>
            <li><a href="#" class="nav-link">關於</a></li>
            <li><a href="#" class="nav-link">故事</a></li>
            <li><a href="#" class="nav-link">聯絡</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <HeroSection />
      <ArticleGrid />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 生活故事. 記錄每個平凡人的不平凡時刻.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import ArticleGrid from './components/ArticleGrid.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    ArticleGrid
  }
}
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0;
}

.brand-link {
  color: #2c2c2c;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 300;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #2c2c2c;
}

.footer {
  background: #f8f8f8;
  padding: 3rem 0;
  text-align: center;
  margin-top: 4rem;
}

.footer p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-brand h1 {
    font-size: 1.5rem;
  }
}
</style>