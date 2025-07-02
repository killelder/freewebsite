<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="nav-brand">
            <h1><a href="#" class="brand-link">XX會計師事務所</a></h1>
          </div>
          <ul class="nav-menu">
            <li><a href="#" class="nav-link" @click="setPage('home')" :class="{ active: currentPage === 'home' }">首頁</a></li>
            <li><a href="#" class="nav-link" @click="setPage('about')" :class="{ active: currentPage === 'about' }">關於</a></li>
            <li><a href="#" class="nav-link" @click="setPage('cases')" :class="{ active: currentPage === 'cases' }">案例</a></li>
            <li><a href="#contact" class="nav-link">聯絡</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <HeroSection v-if="currentPage === 'home'" />
      <ArticleGrid v-if="currentPage === 'home'" />
      <CaseStudies v-if="currentPage === 'cases'" />
    </main>

    <!-- Footer -->
    <footer class="footer" id="contact">
      <div class="container">
        <div class="contact-info">
          <div class="contact-section">
            <h3>聯絡資訊</h3>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-label">地址：</span>
                <span>台北市信義區信義路五段7號</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">電話：</span>
                <span>02-2345-6789</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">傳真：</span>
                <span>02-2345-6790</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Email：</span>
                <span>info@xxaccounting.com</span>
              </div>
            </div>
          </div>
          <div class="contact-section">
            <h3>營業時間</h3>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-label">週一至週五：</span>
                <span>09:00 - 18:00</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">週六：</span>
                <span>09:00 - 12:00</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">週日：</span>
                <span>休息</span>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; 2025 XX會計師事務所. 專業會計服務，值得信賴的夥伴.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import ArticleGrid from './components/ArticleGrid.vue'
import CaseStudies from './components/CaseStudies.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    ArticleGrid,
    CaseStudies
  },
  data() {
    return {
      currentPage: 'home'
    }
  },
  methods: {
    setPage(page) {
      this.currentPage = page
    }
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

.nav-link:hover,
.nav-link.active {
  color: #2c2c2c;
}

.nav-link.active {
  font-weight: 500;
  border-bottom: 2px solid #2c2c2c;
}

.footer {
  background: #f8f8f8;
  padding: 3rem 0;
  margin-top: 4rem;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.contact-section h3 {
  color: #2c2c2c;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: left;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: left;
}

.contact-label {
  color: #666;
  font-weight: 500;
  min-width: 80px;
  flex-shrink: 0;
}

.contact-item span:last-child {
  color: #2c2c2c;
}

.copyright {
  text-align: center;
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.copyright p {
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
  
  .contact-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-section h3 {
    text-align: center;
  }
  
  .contact-item {
    justify-content: center;
  }
}
</style>