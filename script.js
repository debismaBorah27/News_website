const API_KEY = "45272d197db744388c5a4ec006449dff";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles){
   const cardsContainer = document.getElementById('cards-container');
   const newsCardTemplate = document.getElementById("template-news-card");

   cardsContainer.innerHTML = "";

   articles.forEach((article) => {
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
   const newsImg = cardClone.querySelector("#news-img");
   const newsTitle = cardClone.querySelector("#news-title");
   const newsSource = cardClone.querySelector("#news-source");
   const newsDesc = cardClone.querySelector("#news-desc");

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;

   cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
  });
}

function onNavItemClick(id) {
   fetchNews(id);
   const navItem = document.getElementById(id);
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});