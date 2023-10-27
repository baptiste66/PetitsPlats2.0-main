import { cardDetails } from '../models/data-Card.js';

const recipeCardsContainer = document.querySelector('#card');
const totalRecipes = cardDetails.length;

cardDetails.forEach(card => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeLink = document.createElement('a');
    recipeLink.href = '#';

    


    recipeCard.innerHTML = `
   
        <img src="assets/photos recette/${card.image}" alt="${card.name}">
         <p  class="card__time">${card.time} min</p>
        <h2>${card.name}</h2>
        <span class="debord"><p><span class="card__title grey">Recette </span>: <br> ${card.description}</p></span>

        <p><span class="card__title grey">Ingrédients</span>: <br><span class ="card__ingredient">${formatIngredients(card.ingredients)}</span></p>
        
        `;

   
    recipeLink.appendChild(recipeCard);

   
    recipeCardsContainer.appendChild(recipeLink);
});
const totalRecipesElement = document.createElement('p');
totalRecipesElement.textContent = `${totalRecipes} recettes`;
totalRecipesElement.setAttribute('class','card__total')
recipeCardsContainer.appendChild(totalRecipesElement);


function formatIngredients(ingredients) {
    if (!ingredients) return '';

    const ingredientList = ingredients.map(ingredient => {
        let formattedIngredient = `<span class="card__ingredient__content">${ingredient.ingredient}`;
        if (ingredient.quantity) {
            formattedIngredient += `<br><span class="card__ingredient__quantity grey">${ingredient.quantity}`;
            if (ingredient.unit) {
                formattedIngredient += ` ${ingredient.unit}`;
            }
            formattedIngredient += `</span>`;
        }
        formattedIngredient += `</span>`;
        return formattedIngredient;
    });

    return ingredientList.join('<br>');
}
