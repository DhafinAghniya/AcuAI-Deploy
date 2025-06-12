import api from "../../data/api";

export default class LoginPage {
async render() {
  return `
    <div class="auth-wrapper">
      <div class="auth-left">
        <div class="auth-box">
          <h2>SELAMAT DATANG DI ACU AI</h2>
          <p>Silakan masukkan detail akunmu untuk masuk.</p>

          <form id="loginForm" class="auth-form">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" name="email" placeholder="Masukkan email kamu" required />

            <label for="login-password">Kata Sandi</label>
            <div class="password-wrapper">
              <input type="password" id="login-password" name="password" placeholder="********" required />
              <button type="button" id="togglePassword" class="toggle-password">👁️</button>
            </div>

            <button type="submit" class="btn-filled">Masuk</button>
          </form>

          <div class="auth-footer">
            Belum punya akun? <a href="#/register">Daftar gratis di sini!</a>
          </div>
        </div>
      </div>
    </div>
  `;
}


  async afterRender() {
  const form = document.getElementById("loginForm");
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("login-password");

  // 👁️ Toggle Password (Pindah ke luar dari event submit)
  toggleBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleBtn.textContent = type === "password" ? "👁️" : "🙈";
  });

  // ✅ Event submit form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await api.login(email, password);
      localStorage.setItem("token", response.token);

      await Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat datang kembali 👋',
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.href = "#/home";
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message || 'Periksa kembali email dan passwordmu!',
      });
    }
  });
}
}