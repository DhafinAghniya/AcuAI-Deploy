import api from "../../data/api";
export default class RegisterPage {
  async render() {
    return `
      <section class="auth-container">
        <h2 class="auth-title">Buat Akun Baru</h2>
        <form id="registerForm" class="auth-form">
          <label for="register-username">Username</label>
          <input type="text" id="register-username" name="username" required />

          <label for="register-email">Email</label>
          <input type="email" id="register-email" name="email" required />

          <label for="register-password">Password</label>
          <input type="password" id="register-password" name="password" required />

          <button type="submit" class="btn-filled blue">Daftar</button>
        </form>
        <p class="auth-switch">
          Sudah punya akun? <a href="#/">Masuk di sini</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      // Validasi sederhana
      if (!username || !email || !password) {
        alert("Semua field harus diisi!");
        return;
      }

      try {
        // Kirim data ke backend
        // Jika backend Anda tidak membutuhkan username, hapus dari body
        const response = await api.register(username, email, password);

        // Simpan token & user (jika ada)
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        alert("Registrasi berhasil! Silakan login.");
        window.location.hash = "/"; // Redirect ke halaman login/dashboard
      } catch (error) {
        // Tampilkan pesan error dari backend
        alert(error.message || "Registrasi gagal. Silakan coba lagi.");
      }
    });
  }
}
