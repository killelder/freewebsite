<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop" alt="Featured Story" />
        </div>
        <div class="hero-text">
          <div class="hero-story">
            <h2>街角的咖啡師</h2>
            <p class="hero-quote">
              "每天早上六點，我就會來到這家小咖啡店。不是因為薪水特別好，而是因為我喜歡看到客人喝到我調製的咖啡時臉上的笑容。有一位老先生，每天都會點同樣的拿鐵，然後坐在窗邊看書。三年了，從未間斷。昨天他告訴我，這杯咖啡是他每天最期待的時光。"
            </p>
            <p class="hero-location">台北，大安區</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero {
  padding: 4rem 0;
  background: #fafafa;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.hero-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 4px;
}

.hero-story h2 {
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #2c2c2c;
}

.hero-quote {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #4a4a4a;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.hero-location {
  font-size: 1rem;
  color: #888;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-image img {
    height: 300px;
  }
  
  .hero-story h2 {
    font-size: 1.8rem;
  }
  
  .hero-quote {
    font-size: 1.1rem;
  }
}
</style>