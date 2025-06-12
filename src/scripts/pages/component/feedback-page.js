import api from "../../data/api";

export default class FeedbackPage {
  async render() {
    return `
      <section class="container feedback-page">
        <h2 class="center-title">Kritik & Saran</h2>
        <p>Bantu kami meningkatkan AcuAI dengan memberikan masukan Anda di bawah ini.</p>

        <form id="feedback-form" class="feedback-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" placeholder="Nama Anda" required />
          </div>

          <div class="form-group">
            <label for="message">Pesan / Masukan</label>
            <textarea id="message" name="message" placeholder="Tuliskan masukan Anda di sini..." required></textarea>
          </div>

          <button type="submit" class="btn-filled blue">Kirim Masukan</button>
        </form>

        <div id="feedback-success" class="feedback-success hidden" style="text-align: center;">
          <p>Terima kasih atas masukan Anda! 🙏</p>
          <button id="feedback-again" class="btn-filled" style="margin-top: 10px;">Kirim Feedback Lainnya</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector('#feedback-form');
    const successMessage = document.querySelector('#feedback-success');
    const feedbackAgainBtn = document.querySelector('#feedback-again');

    form?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const message = form.message.value.trim();

      if (!name || !message) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Nama dan pesan wajib diisi.',
        });
        return;
      }

      try {
        Swal.fire({
          title: 'Mengirim feedback...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await api.sendFeedback(name, message);

        Swal.close();
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengirim',
          text: 'Silakan coba lagi nanti.',
        });
        console.error("Feedback error:", error);
      }
    });

    feedbackAgainBtn?.addEventListener('click', () => {
      form.classList.remove('hidden');
      successMessage.classList.add('hidden');
      form.reset();
    });
  }
}
