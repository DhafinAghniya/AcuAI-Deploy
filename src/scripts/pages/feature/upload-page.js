export default class UploadPage {
  async render() {
    return `
      <section class="container upload-page">
        <h1 class="upload-title">Temukan Solusi<br>Jerawatmu Sekarang</h1>
        <p class="upload-subtitle">
          Ambil langkah pertama menuju kulit lebih sehat.<br>
          Aktifkan kamera, ambil foto, dan dapatkan analisis jerawat otomatis<br>
          dari teknologi AcuAI.
        </p>

        <div class="upload-actions">
          <button id="toggleCamera" class="btn-outline">Aktifkan Kamera</button>
          <button id="capturePhoto" class="btn-outline" disabled>Ambil Foto</button>
        </div>

        <div class="camera-preview">
          <video id="cameraVideo" autoplay playsinline hidden></video>
          <canvas id="photoCanvas" width="640" height="480" hidden></canvas>
          <img id="preview" src="" alt="Preview Kamera" hidden />
        </div>

        <div class="upload-button-wrapper">
          <input type="file" id="photoInput" hidden accept="image/png, image/jpeg" />
          <label for="photoInput" class="btn-filled blue">Upload Foto Manual</label>
        </div>

        <div class="upload-instructions">
          <ul>
            <li><span class="number">1</span> Gambar harus jelas dan tanpa filter</li>
            <li><span class="number">2</span> Wajah menghadap kamera secara langsung</li>
            <li><span class="number">3</span> Format: JPG, JPEG, PNG</li>
            <li><span class="number">4</span> Resolusi minimal 640 × 480 piksel</li>
            <li><span class="number">5</span> Ukuran maksimal 5 MB</li>
          </ul>
        </div>

        <div class="submit-analysis">
          <button id="analyzeBtn" class="btn-filled blue">Analisis</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const toggleCameraBtn = document.getElementById('toggleCamera');
    const capturePhotoBtn = document.getElementById('capturePhoto');
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('photoCanvas');
    const preview = document.getElementById('preview');
    const photoInput = document.getElementById('photoInput');
    const analyzeBtn = document.getElementById('analyzeBtn');

    let stream = null;
    let cameraActive = false;

    // Kamera ON/OFF
    toggleCameraBtn.addEventListener('click', async () => {
      if (!cameraActive) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.hidden = false;
          toggleCameraBtn.textContent = 'Matikan Kamera';
          capturePhotoBtn.disabled = false;
          cameraActive = true;
        } catch (err) {
          alert('Tidak dapat mengakses kamera.');
          console.error(err);
        }
      } else {
        stream.getTracks().forEach(track => track.stop());
        video.hidden = true;
        toggleCameraBtn.textContent = 'Aktifkan Kamera';
        capturePhotoBtn.disabled = true;
        cameraActive = false;
      }
    });

    // Ambil Foto dari Kamera
    capturePhotoBtn.addEventListener('click', () => {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      preview.src = imageData;
      preview.alt = 'Foto dari Kamera';
      preview.hidden = false;
    });

    // Upload Manual dari File
    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        preview.src = URL.createObjectURL(file);
        preview.alt = 'Foto yang Diunggah';
        preview.hidden = false;
      }
    });

    // Tombol Analisis
    analyzeBtn.addEventListener('click', async () => {
      if (!preview.src || preview.hidden) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Silakan ambil atau unggah foto terlebih dahulu.'
        });
        return;
      }

      Swal.fire({
        title: 'Sedang menganalisis...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const formData = new FormData();

        if (preview.src.startsWith('data:image')) {
          const blob = await (await fetch(preview.src)).blob();
          formData.append('file', blob, 'captured.png');
        } else if (photoInput.files[0]) {
          formData.append('file', photoInput.files[0]);
        } else {
          throw new Error('Gambar tidak valid.');
        }

        const response = await fetch('https://dhapunk-integrasi-acuai.hf.space/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Gagal mengirim gambar ke server.');
        }

        const result = await response.json();

        // Simpan hasil ke localStorage
        localStorage.setItem('acuai_result', JSON.stringify({
          image: preview.src,
          class: result.class,
          confidence: result.confidence
        }));

        Swal.close();
        window.location.hash = '#/result';

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Analisis Gagal',
          text: err.message || 'Terjadi kesalahan saat memproses gambar.',
        });
      }
    });
  }
}
