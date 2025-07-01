<template>
  <section class="article-grid">
    <div class="container">
      <h2 class="section-title">更多故事</h2>
      <div class="grid">
        <article 
          v-for="article in articles" 
          :key="article.id" 
          class="article-card"
        >
          <div class="card-image">
            <img :src="article.image" :alt="article.title" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-excerpt">{{ article.excerpt }}</p>
            <p class="card-location">{{ article.location }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArticleGrid',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: '夜市的燒餅師傅',
          excerpt: '"每個燒餅都是我的作品，從和麵到烘烤，每個步驟都不能馬虎。看到客人咬下第一口時滿足的表情，就是我繼續做下去的動力。"',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
          location: '台北，士林夜市'
        },
        {
          id: 2,
          title: '書店的老闆娘',
          excerpt: '"這間書店開了二十年，見證了這條街的變遷。雖然網路書店很方便，但我相信實體書店有它不可取代的溫度和人情味。"',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
          location: '台中，西區'
        },
        {
          id: 3,
          title: '公園裡的街頭藝人',
          excerpt: '"音樂是我的語言，透過吉他的弦聲，我想告訴每個路過的人：不管生活多麼艱難，總有美好的事物值得我們駐足聆聽。"',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
          location: '高雄，中央公園'
        },
        {
          id: 4,
          title: '菜市場的花店阿姨',
          excerpt: '"每朵花都有它的故事，有人買來慶祝，有人買來道歉，有人買來紀念。我的工作就是幫助這些花找到它們的歸宿。"',
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
          location: '台南，東門市場'
        },
        {
          id: 5,
          title: '深夜的計程車司機',
          excerpt: '"這個城市的夜晚很美，也很孤獨。我載過哭泣的上班族，也載過興奮的年輕人。每個人都有自己的故事，我只是他們故事中的一個過客。"',
          image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
          location: '台北，信義區'
        },
        {
          id: 6,
          title: '海邊的衝浪教練',
          excerpt: '"海浪教會我很多事情，最重要的是學會與自然和諧相處。我希望每個學生都能從衝浪中找到內心的平靜和力量。"',
          image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
          location: '宜蘭，頭城'
        }
      ]
    }
  }
}
</script>

<style scoped>
.article-grid {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 200;
  margin-bottom: 3rem;
  color: #2c2c2c;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.article-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 2rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: #2c2c2c;
}

.card-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
}

.card-location {
  font-size: 0.9rem;
  color: #999;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .article-grid {
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
}
</style>