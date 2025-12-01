document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const API_URL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=9';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de xarxa. Codi d'estat: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                data.results.forEach(article => {
                    const cardHTML = `
                        <div class="col s12 m6 l4">
                            <div class="news-card card-style hoverable">
                                <div class="card-image-box waves-effect waves-block waves-light">
                                    <img class="card-img activator" src="${article.image_url}" alt="Imatge de la notícia" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=Imatge+No+Disponible';">
                                </div>
                                <div class="card-content-area">
                                    <a href="${article.url}" target="_blank"><span class="card-title-text activator">${article.title}</span></a>
                                    <p class="card-source-text">${article.news_site}</p>
                                </div>
                                <div class="card-reveal-details">
                                    <span class="card-title-text">${article.title}</span>
                                    <p>${article.summary}</p>
                                </div>
                                <div class="card-action-links">
                                    <a href="${article.url}" target="_blank">Llegir Article Complet</a>
                                </div>
                            </div>
                        </div>
                    `;
                    newsContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
            } else {
                 newsContainer.innerHTML = `<div class="col s12"><p>No s'han trobat articles de notícies.</p></div>`;
            }
        })
        .catch(error => {
            console.error('Error en obtenir les notícies:', error);
            newsContainer.innerHTML = `
                <div class="col s12">
                    <div class="error-panel">
                        ❌ Error al carregar les notícies: ${error.message}
                    </div>
                </div>
            `;
        });
});