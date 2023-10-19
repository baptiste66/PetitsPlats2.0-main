import { cardDetails } from '../models/data-Card.js';

const ingredientsSelect = document.querySelector('#ingredients');
const applianceSelect = document.querySelector('#appliance');
const ustensilsSelect = document.querySelector('#ustensils');
const selectContainer = document.querySelector('.select');
const recipeCardsContainer = document.querySelector('#card');

const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensils = [];

ingredientsSelect.addEventListener('change', function () {
  optionSelect(this, selectedIngredients);
});

applianceSelect.addEventListener('change', function () {
  optionSelect(this, selectedAppliances);
});

ustensilsSelect.addEventListener('change', function () {
  optionSelect(this, selectedUstensils);
});

function optionSelect(selectElement, selectedItems) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  if (selectedOption.value !== 'default') {
    selectedItems.push(selectedOption.text);
    const button = document.createElement('button');
    button.textContent = selectedOption.text;
    selectContainer.appendChild(button);
    selectedOption.style.backgroundColor = '#FFD15B';
    selectedOption.disabled = true;
    selectElement.selectedIndex = 0;

    
    filterRecipes();
  }
}

const totalRecipesElement = document.createElement('p');
totalRecipesElement.setAttribute('class', 'card__total');

let totalRecipes = 0;
recipeCardsContainer.appendChild(totalRecipesElement);


function filterRecipes() {
  const filteredRecipes = cardDetails.filter((recipe) => {
    const { ingredients, appliance, ustensils } = recipe;
    return (
      selectedIngredients.every((ingredient) =>
        ingredients.some((ing) => ing.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
      ) &&
      selectedAppliances.every((appliance) => appliance.toLowerCase().includes(appliance.toLowerCase())) &&
      selectedUstensils.every((ustensil) =>
        ustensils.some((u) => u.toLowerCase().includes(ustensil.toLowerCase()))
      )
    );
    
  
  });
updateRecipeDisplay(filteredRecipes);
  totalRecipes = filteredRecipes.length;
  totalRecipesElement.textContent = `${totalRecipes} recettes`;
  recipeCardsContainer.appendChild(totalRecipesElement);
  
}

function updateRecipeDisplay(recipes) {
  recipeCardsContainer.innerHTML = '';

  for (const card of recipes) { 
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    const recipeLink = document.createElement('a');
    recipeLink.href = '#';
    recipeCard.innerHTML = `
        <img src="../../assets/photos recette/${card.image}" alt="${card.name}">
        <p class="card__time">${card.time} min</p>
        <h2>${card.name}</h2>
        <span class="debord">
            <p><span class="card__title grey">Recette</span>: <br>${card.description}</p>
        </span>
        <p><span class="card__title grey">Ingrédients</span>: <br><span class="card__ingredient">${formatIngredients(card.ingredients)}</span></p>
    `;
    recipeLink.appendChild(recipeCard);
    recipeCardsContainer.appendChild(recipeLink);
  }
}

function formatIngredients(ingredients) {
  if (!ingredients) return '';

  const ingredientList = [];

  for (const ingredient of ingredients) {
    let formattedIngredient = `<span class="card__ingredient__content">${ingredient.ingredient}`;

    if (ingredient.quantity) {
      formattedIngredient += `<br><span class="card__ingredient__quantity grey">${ingredient.quantity}`;
      if (ingredient.unit) {
        formattedIngredient += ` ${ingredient.unit}`;
      }
      formattedIngredient += `</span>`;
    }

    formattedIngredient += `</span>`;
    ingredientList.push(formattedIngredient);
  }

  return ingredientList.join('<br>');
}