export default class AboutPage {
  async render() {
    return `
      <section class="container about-page">
        <h2 class="center-title">Our Team</h2>
        
        <div class="team-row">
          <div class="team-member">
            <img src="images/no-11.JPG" alt="Nama Lengkap 1">
            <h3>Nanda Anis Fitria</h3>
            <p>Asal Kampus: Universitas Pendidikan Indonesia</p>
            <p>Jobdesk: Machine Learning</p>
          </div>
          <div class="team-member">
            <img src="images/no-2.jpg" alt="Nama Lengkap 2">
            <h3>Lisna Rahma Fitriati</h3>
            <p>Asal Kampus: Universitas Pendidikan Indonesia</p>
            <p>Jobdesk: Machine Learning</p>
          </div>
        </div>

        <div class="team-row">
          <div class="team-member">
            <img src="images/no-3.png" alt="Nama Lengkap 3">
            <h3>Muhammad Dhafin Aghniya</h3>
            <p>Asal Kampus: Universitas Pendidikan Indonesia</p>
            <p>Jobdesk: Back-End Developer</p>
          </div>
          <div class="team-member">
            <img src="images/no-44.jpg" alt="Nama Lengkap 4">
            <h3>Suprianto</h3>
            <p>Asal Kampus: Politeknik Negeri Jember</p>
            <p>Jobdesk: Front-End Developer</p>
          </div>
          <div class="team-member">
            <img src="images/no-55.jpg" alt="Nama Lengkap 5">
            <h3>Rehand Naifisurya Hermansyah</h3>
            <p>Asal Kampus: Universitas Siliwangi</p>
            <p>Jobdesk: Machine Learning</p>
          </div>
        </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Optional: interactivity after rendering
  }
}
