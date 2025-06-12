import skincareProducts from './daftar-produk.js';

export default class ProductPage {
    async render() {
        return `
      <section class="container product-page">
        <h2>Kategori Produk</h2>

        <div class="category-tabs">
            <button class="tab active" data-category="semua">Semua</button>
            <button class="tab" data-category="cleanser">Cleanser</button>
            <button class="tab" data-category="toner/moisturizer">Toner/Moisturizer</button>
            <button class="tab" data-category="serum/salep">Serum/Salep</button>
        </div>

        <div class="product-grid"></div>
      </section>
    `;
    }

    async afterRender() {
        const productGrid = document.querySelector('.product-grid');
        const tabs = document.querySelectorAll('.tab');

        const renderProducts = (kategori) => {
            productGrid.innerHTML = '';

            const produkFiltered = kategori === 'semua'
                ? skincareProducts
                : skincareProducts.filter((produk) => produk.kategori === kategori);

            produkFiltered.forEach((produk) => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.innerHTML = `
                <img src="${produk.gambar}" alt="${produk.nama}" />
                <h3>${produk.nama}</h3>
                <p><strong>Jenis Jerawat:</strong> ${produk.jerawat || '-'}</p>
                <p><strong>Jenis Skincare:</strong> ${produk.jenisSkincare || '-'}</p>
                <p><strong>Rekomendasi:</strong> ${produk.rekomendasi || '-'}</p>
                <p><strong>Kandungan:</strong> ${produk.kandungan || '-'}</p>
                <p><strong>Keterangan:</strong> ${produk.keterangan || '-'}</p>
                <a href="${produk.link || '#'}" target="_blank">Lihat Produk</a>
                `;
                productGrid.appendChild(card);
            });
        };

        renderProducts('semua');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                document.querySelector('.tab.active').classList.remove('active');
                tab.classList.add('active');

                const kategori = tab.dataset.category;
                renderProducts(kategori);
            });
        });
    }
}
