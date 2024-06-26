document.addEventListener('DOMContentLoaded', () => {
    async function fetchFromJsonServer(endpoint) {
      const response = await fetch('https://pratico-1.1526919.repl.co/' + endpoint);
      return response.json();
    }
  
    async function fetchFromGitHub(endpoint) {
      const response = await fetch(`https://api.github.com/${endpoint}`);
      return response.json();
    }
  
    async function updateProfile() {
      const profile = await fetchFromGitHub('users/hugo989');
      document.querySelector('.perfil h2').textContent = profile.name;
      document.querySelector('.perfil img').src = profile.avatar_url;
      document.querySelector('.perfil p').textContent = profile.bio;
      document.querySelector('.perfil h3').textContent = `Location: ${profile.location}`;
    }
  
    async function updateRepositories() {
      const repositories = await fetchFromJsonServer('repositorios');
      const reposContainer = document.querySelector('.card-group');
      reposContainer.innerHTML = '';
      repositories.forEach(repo => {
        const repoCard = `
          <div class="card">
            <img src="perfil.jpg" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title"><a href="${repo.url}">${repo.nome}</a></h5>
              <p class="card-text">${repo.descricao}</p>
              <img src="estrela.png" height="25px" width="25px">${repo.estrelas}
              <img src="perf.png" height="25px" width="25px">${repo.watchers}
            </div>
          </div>
        `;
        reposContainer.innerHTML += repoCard;
      });
    }
  
    async function updateContent() {
      const content = await fetchFromJsonServer('albuns');
      const carouselInner = document.querySelector('.carousel-inner');
      const carouselIndicators = document.querySelector('.carousel-indicators');
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';
      content.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const carouselItem = `
          <div class="carousel-item ${activeClass}">
            <img src="${item.urlImagem}" class="d-block w-100">
            <div class="carousel-caption d-none d-md-block">
              <h5>${item.titulo}</h5>
              <p>${item.descricao}</p>
            </div>
          </div>
        `;
        const indicatorItem = `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        carouselInner.innerHTML += carouselItem;
        carouselIndicators.innerHTML += indicatorItem;
      });
    }
  
    async function updateColleagues() {
      const colleagues = await fetchFromJsonServer('colegas');
      const colleaguesContainer = document.querySelector('.colegas');
      colleaguesContainer.innerHTML = '';
      colleagues.forEach(colleague => {
        const colleagueCard = `
          <div>
            <img src="${colleague.urlFoto}" height="50px" width="150px">
            <figcaption>${colleague.nome}</figcaption>
          </div>
        `;
        colleaguesContainer.innerHTML += colleagueCard;
      });
    }
  
    updateProfile();
    updateRepositories();
    updateContent();
    updateColleagues();
  });
  