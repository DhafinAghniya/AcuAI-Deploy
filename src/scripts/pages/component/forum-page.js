import api from "../../data/api";

export default class ForumPage {
  async render() {
    return `
      <section class="forum-container">
        <div class="forum-left">
          <h3>Kirim Pesan</h3>
          <form id="chatForm" class="chat-form">
            <label for="username">Nama</label>
            <input type="text" id="username" name="username" placeholder="Masukkan namamu" required />

            <label for="message">Pesan</label>
            <textarea id="message" name="message" rows="4" placeholder="Tulis pesanmu..." required></textarea>

            <button type="submit" class="btn-send">Kirim</button>
          </form>
        </div>

        <div class="forum-right">
          <h3>Forum Chat</h3>
          <div id="chatBox" class="chat-box">
            <!-- Pesan akan ditampilkan di sini -->
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("chatForm");
    const chatBox = document.getElementById("chatBox");

    const fetchMessages = async () => {
      try {
        const result = await api.getForumPosts();
        return result.data || [];
      } catch (error) {
        console.error("Gagal mengambil data forum:", error);
        return [];
      }
    };

    const renderMessages = (messages) => {
      chatBox.innerHTML = "";
      messages.forEach(({ username, message, createdAt }) => {
        const chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.innerHTML = `
          <div class="chat-header">
            <strong>${username}</strong>
            <span class="chat-time">${new Date(createdAt).toLocaleString()}</span>
          </div>
          <div class="chat-message">${message}</div>
        `;
        chatBox.appendChild(chatItem);
      });
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Tampilkan semua pesan saat halaman dimuat
    const messages = await fetchMessages();
    renderMessages(messages);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = form.username.value.trim();
      const message = form.message.value.trim();

      if (!username || !message) return;

      try {
        Swal.fire({
          title: 'Mengirim pesan...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await api.createForumPost({ username, message });

        Swal.close();

        const updatedMessages = await fetchMessages();
        renderMessages(updatedMessages);
        form.reset();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengirim pesan',
          text: 'Silakan coba lagi.',
        });
        console.error("Gagal mengirim pesan:", error);
      }
    });
  }
}
