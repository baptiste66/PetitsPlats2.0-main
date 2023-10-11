import { cardDetails } from '../models/data-Card.js';

const recipeCardsContainer = document.querySelector('#card');


cardDetails.forEach(card => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeLink = document.createElement('a');
    recipeLink.href = '#';

    recipeCard.innerHTML = `
        <img src="../../assets/photos recette/${card.image}" alt="${card.name}">
         <p  class="card__time">${card.time} min</p>
        <h2>${card.name}</h2>
        <span class="debord"><p><span class="card__title">Recette </span>: <br> ${card.description}</p></span>

        <p><span class="card__title">Ingrédients</span> : <br> ${card.ingredients}</p>
        
        `;

   
    recipeLink.appendChild(recipeCard);

   
    recipeCardsContainer.appendChild(recipeLink);
});
