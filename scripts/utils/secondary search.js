import { cardDetails } from '../models/data-Card.js';

const ingredientsOptions = document.querySelectorAll('#ingredientsList option');
const applianceOptions = document.querySelectorAll('#appliancesList option');
const ustensilsOptions = document.querySelectorAll('#utensilsList option');
const selectContainer = document.querySelector('.select-option');
const recipeCardsContainer = document.querySelector('#card');

const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensils = [];

ingredientsOptions.forEach(option => {
  option.addEventListener('click', function () {
    optionSelect(option, selectedIngredients);
  });
});

applianceOptions.forEach(option => {
  option.addEventListener('click', function () {
    optionSelect(option, selectedAppliances);
  });
});

ustensilsOptions.forEach(option => {
  option.addEventListener('click', function () {
    optionSelect(option, selectedUstensils);
  });
});

function optionSelect(option, selectedItems) {
  if (option.value !== 'default') {
    const optionText = option.text;
    if (selectedItems.includes(optionText)) {
      return;
    }
    selectedItems.push(optionText);
    const button = document.createElement('p');
    button.textContent = optionText;

    const removeButton = document.createElement('button');
    const closeIcon = document.createElement('img');
    closeIcon.src = 'assets/svg/close.svg';

    removeButton.appendChild(closeIcon);
    removeButton.addEventListener('click', function () {
      const itemIndex = selectedItems.indexOf(optionText);
      if (itemIndex !== -1) {
        selectedItems.splice(itemIndex, 1);
      }
      selectContainer.removeChild(button);
      option.style.backgroundColor = '';
      option.disabled = false;
      filterRecipes();
    });

    button.appendChild(removeButton);
    selectContainer.appendChild(button);

    option.style.backgroundColor = '#FFD15B';
    option.disabled = true;
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
      selectedAppliances.every((applianceName) => appliance.toLowerCase().includes(applianceName.toLowerCase())) &&
      selectedUstensils.every((ustensil) =>
        ustensils.some((u) => u.toLowerCase().includes(ustensil.toLowerCase()))
      )
    );
  });
updateRecipeDisplay(filteredRecipes);
  totalRecipes = filteredRecipes.length;
  totalRecipesElement.textContent = `${totalRecipes} recettes`;
  recipeCardsContainer.appendChild(totalRecipesElement);
  if (filteredRecipes.length === 0) {
    const selectedOptions = [...selectedIngredients, selectedAppliances[0], ...selectedUstensils].join(', ');
    const errorMessageElement = document.createElement('p');
    errorMessageElement.textContent = `Aucune recette ne contient les options sélectionnées : ${selectedOptions}`;
    errorMessageElement.classList.add('error-message');
    recipeCardsContainer.innerHTML = '';  
    recipeCardsContainer.appendChild(errorMessageElement);  
    totalRecipesElement.textContent = '0 recettes';  
  }
  
}




function updateRecipeDisplay(recipes) {
  recipeCardsContainer.innerHTML = '';

  for (const card of recipes) { 
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    const recipeLink = document.createElement('a');
    recipeLink.href = '#';
    recipeCard.innerHTML = `
        <img src="assets/photos recette/${card.image}" alt="${card.name}">
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