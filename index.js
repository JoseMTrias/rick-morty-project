// import statement: importing the createCharacterCard function from the card.js file
import { createCharacterCard } from "./components/card/card.js";

// const cardContainer: selecting the card container element from the DOM
const cardContainer = document.querySelector('[data-js="card-container"]');

// const searchBarContainer: selecting the search bar container element from the DOM
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');

// const navigation: selecting the navigation element from the DOM
const navigation = document.querySelector('[data-js="navigation"]');

// const prevButton: selecting the previous button element from the DOM
const prevButton = document.querySelector('[data-js="button-prev"]');

// const nextButton: selecting the next button element from the DOM
const nextButton = document.querySelector('[data-js="button-next"]');

// const pagination: selecting the pagination element from the DOM
const pagination = document.querySelector('[data-js="pagination"]');

// States
// let maxPage: declaring a variable to store the maximum number of pages
let maxPage;

// let page: declaring a variable to store the current page number
let page = 1;

// let searchQuery: declaring a variable to store the user's search query
let searchQuery = "";

// async function fetchCharacters(): declaring an async function to fetch character data from the API
async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  maxPage = data.info.pages;
  cardContainer.innerHTML = "";
  const characterData = data.results;
  pagination.innerHTML = `${page} / ${maxPage}`;
  characterData.forEach((character) => {
    const li = createCharacterCard(character);
    cardContainer.append(li);
  });
}

// nextButton.addEventListener("click", () => {}: adding a click event listener to the next button to move to the next page
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
    pagination.innerHTML = `${page} / ${maxPage}`;
  } else {
    pagination.innerHTML = `${page} / ${maxPage}`;
  }
});

// prevButton.addEventListener("click", () => {}: adding a click event listener to the previous button to move to the previous page
prevButton.addEventListener("click", () => {
  if (page > 1) {
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
