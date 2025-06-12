export default class FeaturePage {
  async render() {
    return `
      <section class="container feature-page">
        <div class="feature-hero">
          <div class="feature-image">
            <img src="images/wajah-2.png" alt="Wajah Analisis" />
          </div>
          <div class="feature-text">
            <h1>Temukan Solusi<br>Jerawatmu Sekarang</h1>
            <p>
              Ambil langkah pertama menuju kulit lebih sehat.<br>
              Unggah fotomu dan dapatkan analisis jerawat otomatis<br>
              dari teknologi AcuAI.
            </p>
            <div class="feature-buttons">
              <button class="go-to-upload btn-outline">Ambil Foto</button>
              <button class="go-to-upload btn-filled">Upload Foto</button>
            </div>
          </div>
        </div>
      </section>
      <hr class="section-divider" />
      <section class="upload-instruction container">
        <div>
          <h2>Instruksi & Ketentuan</h2>
          <ul class="instruction-list">
            <li><span class="number">1</span> Gambar harus jelas dan tanpa filter</li>
            <li><span class="number">2</span> Wajah menghadap kamera secara langsung</li>
            <li><span class="number">3</span> Format: JPG, JPEG, PNG</li>
            <li><span class="number">4</span> Resolusi minimal 640 × 480 piksel</li>
            <li><span class="number">5</span> Ukuran maksimal 5 MB</li>
          </ul>
          <button class="go-to-upload btn-filled blue">Coba Sekarang!</button>
        </div>
        <div class="instruction-image">
          <img src="images/wajah-3.png" alt="Contoh Foto" />
        </div>
      </section>
    `;
  }

  async afterRender() {
    const uploadButtons = document.querySelectorAll('.go-to-upload');
    uploadButtons.forEach(button => {
      button.addEventListener('click', () => {
        window.location.hash = '#/upload';
      });
    });
  }
}
