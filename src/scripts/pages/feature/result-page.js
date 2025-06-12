import skincareProducts from '../product/daftar-produk';

export default class HasilPage {
  async render() {
    const resultData = JSON.parse(localStorage.getItem('acuai_result'));

    if (!resultData || !resultData.class || !resultData.image) {
      return `
        <section class="container hasil-page">
          <h2>Hasil Tidak Ditemukan</h2>
          <p>Silakan lakukan analisis terlebih dahulu.</p>
          <button class="btn-filled" onclick="window.location.hash='#/upload'">Kembali</button>
        </section>
      `;
    }

    const { image, class: acneClass } = resultData;

    // Filter produk yang cocok
    const recommended = skincareProducts.filter(p =>
      p.jerawat?.toLowerCase() === acneClass.toLowerCase()
    );

    return `
      <section class="container hasil-page">
        <h2>Hasil Analisis Jerawat</h2>
        <img src="${image}" alt="Foto Hasil" class="result-image" />
        <p>Kami mendeteksi kemungkinan jerawat tipe <strong>${acneClass}</strong> dari gambar yang kamu unggah.</p>

        <h3>Rekomendasi Produk:</h3>
        ${recommended.length > 0 ? `
          <div class="product-grid">
            ${recommended.map(p => `
              <div class="product-card">
                <img src="${p.gambar}" alt="${p.nama}" />
                <h4>${p.nama}</h4>
                <p><strong>Kandungan:</strong> ${p.kandungan}</p>
                <p>${p.rekomendasi}</p>
                <a href="${p.link}" target="_blank" class="btn-small">Lihat Produk</a>
              </div>
            `).join('')}
          </div>
        ` : `<p>Tidak ada produk rekomendasi yang ditemukan untuk kategori ini.</p>`}

        <div class="hasil-footer">
          <button class="btn-filled" onclick="window.location.hash='#/upload'">Analisis Ulang</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }
}
