import { cardDetails } from '../models/data-Card.js';

const labelIngredient = document.querySelector('#ingredients');
const labelUstensils = document.querySelector('#ustensils');
const labelAppliance = document.querySelector('#appliance');

cardDetails.forEach(card => {
    const recipeCard = document.createElement('option');
    recipeCard.classList.add('recipe-card');

    recipeCard.innerHTML = `
        ${labelIngredients(card.ingredients)}
        `;

        function labelIngredients(ingredients) {
            if (!ingredients) return '';
        
            const ingredientList = ingredients.map(ingredient => {
                let formattedIngredient = `${ingredient.ingredient}`;
             
                return formattedIngredient;
            });
        
            return ingredientList.join('<br>');
        }
    labelIngredient.appendChild(recipeCard);
});
