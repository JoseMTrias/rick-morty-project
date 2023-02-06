import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";
pagination.innerHTML = `${page} / ${maxPage}`;

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  cardContainer.innerHTML = "";
  const characterCard = data.results;
  characterCard.forEach((character) => {
    const li = createCharacterCard(character);
    cardContainer.append(li);
  });
}

nextButton.addEventListener("click", () => {
  if (page <= 41) {
    page++;
    fetchCharacters();
    pagination.innerHTML = `${page} / ${maxPage}`;
  } else {
    pagination.innerHTML = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", () => {
  if (page >= 2) {
    page--;
    fetchCharacters();
    pagination.innerHTML = `${page} / ${maxPage}`;
  } else {
    pagination.innerHTML = `${page} / ${maxPage}`;
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  fetchCharacters();
});

fetchCharacters();
