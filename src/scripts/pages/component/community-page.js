export default class CommunityPage {
  async render() {
    return `
      <section class="container community-page">
        <h2 class="center-title">Komunitas AcuAI</h2>
        <p>Bergabunglah bersama komunitas pengguna AcuAI untuk berbagi pengalaman, tips perawatan, dan update teknologi kecantikan terkini.</p>

        <div class="community-content">
          <div class="card">
            <a href="#/forum" class="btn-filled1 forum-link">Forum Diskusi</a>
            <p>Tempat berbagi pengalaman dan bertanya seputar perawatan kulit.</p>
          </div>
          <div class="card">
            <a href="#/feedback" class="btn-filled1 testimoni-link">Feedback Pengguna</a>
            <p>Kami ingin mendengar pendapat Anda! Kirimkan masukan agar AcuAI bisa terus berkembang.</p>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tambahkan interaktivitas jika diperlukan
  }
}
