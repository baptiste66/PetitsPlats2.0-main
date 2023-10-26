import { cardDetails } from '../models/data-Card.js';

const ingredientsSelect = document.querySelector('#ingredients');
const applianceSelect = document.querySelector('#appliance');
const ustensilsSelect = document.querySelector('#ustensils');
const selectContainer = document.querySelector('.select-option');
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
    if (selectedItems.includes(selectedOption.text)) {
      const itemIndex = selectedItems.indexOf(selectedOption.text);
      if (itemIndex !== -1) {
        selectedItems.splice(itemIndex, 1);
      }
      const selectedOptionButtons = selectContainer.querySelectorAll('p');
      for (const button of selectedOptionButtons) {
        if (button.textContent === selectedOption.text) {
          selectContainer.removeChild(button);
        }
      }
    } else {
      selectedItems.push(selectedOption.text);
      const button = document.createElement('p');
      button.textContent = selectedOption.text;

      const removeButton = document.createElement('button');
      const closeIcon = document.createElement('img');
      closeIcon.src = '../assets/svg/close.svg'; 

      removeButton.appendChild(closeIcon);
      removeButton.addEventListener('click', function () {
        const itemIndex = selectedItems.indexOf(selectedOption.text);
        if (itemIndex !== -1) {
          selectedItems.splice(itemIndex, 1);
        }
        selectContainer.removeChild(button);
        selectElement.selectedIndex = 0;
        filterRecipes();
      });

      button.appendChild(removeButton);
      selectContainer.appendChild(button);
    }

    const options = [...selectElement.options];
    options.sort((a, b) => {
      const aSelected = selectedItems.includes(a.text);
      const bSelected = selectedItems.includes(b.text);
      if (aSelected === bSelected) {
        return 0;
      } else if (aSelected) {
        return -1;
      } else {
        return 1;
      }
    });
    
    selectElement.innerHTML = '';
    for (const option of options) {
      selectElement.appendChild(option);
    }

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