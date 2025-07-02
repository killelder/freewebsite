<template>
  <section class="case-studies">
    <div class="container">
      <h2 class="section-title">成功案例</h2>
      <p class="section-subtitle">我們為各行各業的客戶提供專業的會計服務，以下是部分成功案例</p>
      
      <div class="cases-grid">
        <!-- Canva 內嵌案例 -->
        <div class="case-card featured">
          <div class="case-header">
            <h3 class="case-title">企業財務規劃案例</h3>
            <span class="case-category">財務規劃</span>
          </div>
          <div class="case-content">
            <div class="canva-embed">
              <iframe 
                src="https://www.canva.com/design/DAGpNqSTOBM/79a8fKqrlKGnTjfTMJe9BA/view?embed" 
                width="100%" 
                height="400"
                frameborder="0"
                allowfullscreen
                title="企業財務規劃案例"
              ></iframe>
              <div class="canva-fallback">
                <p>如果無法顯示內容，請 <a href="https://www.canva.com/design/DAGpNqSTOBM/79a8fKqrlKGnTjfTMJe9BA/view?utm_content=DAGpNqSTOBM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2be818bd06" target="_blank" rel="noopener">點擊這裡查看完整案例</a></p>
              </div>
            </div>
            <div class="case-description">
              <p>為中型製造業客戶提供全面的財務規劃服務，包括成本控制、現金流管理、投資策略等，幫助客戶在一年內提升營運效率達30%。</p>
              <div class="case-highlights">
                <div class="highlight-item">
                  <span class="highlight-label">服務期間：</span>
                  <span>12個月</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-label">營運改善：</span>
                  <span>30%</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-label">成本節省：</span>
                  <span>25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他案例 -->
        <div class="case-card">
          <div class="case-header">
            <h3 class="case-title">新創公司稅務規劃</h3>
            <span class="case-category">稅務規劃</span>
          </div>
          <div class="case-content">
            <div class="case-image">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" alt="新創公司稅務規劃" />
            </div>
            <div class="case-description">
              <p>協助科技新創公司建立完整的稅務規劃體系，包括研發投資抵減、員工認股權規劃等，有效降低稅負並提升企業競爭力。</p>
              <div class="case-highlights">
                <div class="highlight-item">
                  <span class="highlight-label">稅負節省：</span>
                  <span>40%</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-label">服務項目：</span>
                  <span>稅務規劃、投資抵減</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="case-card">
          <div class="case-header">
            <h3 class="case-title">跨國企業審計服務</h3>
            <span class="case-category">審計服務</span>
          </div>
          <div class="case-content">
            <div class="case-image">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" alt="跨國企業審計服務" />
            </div>
            <div class="case-description">
              <p>為跨國製造業集團提供年度審計服務，確保財務報表符合國際會計準則，並協助建立內部控制制度。</p>
              <div class="case-highlights">
                <div class="highlight-item">
                  <span class="highlight-label">審計規模：</span>
                  <span>年營收50億</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-label">完成時間：</span>
                  <span>3個月</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="case-card">
          <div class="case-header">
            <h3 class="case-title">家族企業傳承規劃</h3>
            <span class="case-category">傳承規劃</span>
          </div>
          <div class="case-content">
            <div class="case-image">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" alt="家族企業傳承規劃" />
            </div>
            <div class="case-description">
              <p>協助傳統製造業家族企業制定完整的傳承規劃，包括股權結構重組、稅務規劃、接班計畫等，確保企業永續經營。</p>
              <div class="case-highlights">
                <div class="highlight-item">
                  <span class="highlight-label">規劃期間：</span>
                  <span>18個月</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-label">節稅效益：</span>
                  <span>數千萬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CaseStudies'
}
</script>

<style scoped>
.case-studies {
  padding: 4rem 0;
  background: #fafafa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 200;
  margin-bottom: 1rem;
  color: #2c2c2c;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.case-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.case-card.featured {
  grid-column: 1 / -1;
  max-width: 800px;
  margin: 0 auto;
}

.case-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
}

.case-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #2c2c2c;
}

.case-category {
  display: inline-block;
  background: #e8f4fd;
  color: #0066cc;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.case-content {
  padding: 0 2rem 2rem;
}

.canva-embed {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.canva-embed iframe {
  border-radius: 8px;
  background: #fff;
  min-height: 400px;
}

.canva-fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  display: none;
}

.canva-embed:not(:has(iframe[src*="canva"])) .canva-fallback {
  display: block;
}

.canva-fallback a {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.canva-fallback a:hover {
  text-decoration: underline;
}

.case-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.case-card:hover .case-image img {
  transform: scale(1.05);
}

.case-description {
  margin-top: 1.5rem;
}

.case-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
}

.case-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.highlight-label {
  font-size: 0.8rem;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.highlight-item span:last-child {
  font-size: 1rem;
  color: #2c2c2c;
  font-weight: 500;
}

@media (max-width: 768px) {
  .case-studies {
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .case-card.featured {
    grid-column: 1;
  }
  
  .case-header,
  .case-content {
    padding: 1.5rem;
  }
  
  .case-title {
    font-size: 1.3rem;
  }
  
  .canva-embed iframe {
    height: 300px;
  }
}
</style> 