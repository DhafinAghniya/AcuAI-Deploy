export default class HomePage {
  async render() {
    return `
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-text">
            <h1>Deteksi Jerawat Otomatis,<br>Perawatan Lebih Tepat!</h1>
            <p>
              AcuAI adalah platform web berbasis AI yang mendeteksi jerawat dari gambar wajah
              dan memberi rekomendasi perawatan otomatis.
            </p>
            <a href="#/feature" class="hero-button">Coba Sekarang!</a>
          </div>
          <div class="hero-image">
            <img src="images/wajah.png" alt="Wajah dengan efek deteksi AI" />
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Logic tambahan setelah render (jika perlu)
  }
}
