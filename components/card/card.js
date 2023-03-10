export function createCharacterCard(test) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
      <div class="card__image-container">
        <img
          class="card__image"
          src="${test.image}"
          alt="Rick Sanchez"
        />
        <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
        <h2 class="card__title">${test.name}</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status</dt>
          <dd class="card__info-description">${test.status}</dd>
          <dt class="card__info-title">Type</dt>
          <dd class="card__info-description">${test.type}</dd>
          <dt class="card__info-title">Occurrences</dt>
          <dd class="card__info-description">${test.episode.length}</dd>
        </dl>
      </div>
    </li>
  </ul>`;
  return card;
}
