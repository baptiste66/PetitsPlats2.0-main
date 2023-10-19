import { cardDetails } from '../models/data-Card.js';

const searchBar = document.querySelector('.research__text');
const recipeCardsContainer = document.querySelector('#card');
const searchButton = document.querySelector('.research__logo')
const searchForm = document.querySelector('.research')

let closeButton = null;

function addCloseButton() {
    closeButton = document.createElement('button');
    closeButton.classList.add('reset-research')
    closeButton.innerHTML = '<img src="../assets/svg/close.svg" alt="close">';
    closeButton.addEventListener('click', function () {
        searchBar.value = '';
        closeButton.style.display = 'none';
    });
    searchBar.parentNode.appendChild(closeButton);
}

searchBar.addEventListener('input', function () {
    if (searchBar.value.trim() !== '') {
        if (!closeButton) {
            addCloseButton();
        } else {
            closeButton.style.display = 'block';
        }
    } else {
        if (closeButton) {
            closeButton.style.display = 'none';
        }
    }
});



const totalRecipesElement = document.createElement('p');
totalRecipesElement.setAttribute('class', 'card__total');

let totalRecipes = 0;
recipeCardsContainer.appendChild(totalRecipesElement);

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchBar.value.toLowerCase();

    const filteredRecipes = [];
    let i = 0;
    while (i < cardDetails.length) {
        const { name, ingredients, description, image, time } = cardDetails[i];

        if (name.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm)) {
            filteredRecipes.push(cardDetails[i]);
        } else {
            for (const ingredient of ingredients) {
                if (ingredient.ingredient.toLowerCase().includes(searchTerm)) {
                    filteredRecipes.push(cardDetails[i]);
                    break;
                }
            }
        }
        i++;
    }

    if (filteredRecipes.length === 0) {
      // Aucune recette trouvée, affichez le message d'absence de correspondance dans #card.
      const errorMessageElement = document.createElement('div');
      errorMessageElement.textContent = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher «tarte aux pommes», «poisson», etc.`;
      errorMessageElement.classList.add('error-message'); // Ajoutez des styles CSS si nécessaire
      recipeCardsContainer.innerHTML = ''; // Effacez le contenu précédent
      recipeCardsContainer.appendChild(errorMessageElement); // Ajoutez le message d'erreur à #card
    } else {

        updateRecipeDisplay(filteredRecipes);
        totalRecipes = filteredRecipes.length;
        totalRecipesElement.textContent = `${totalRecipes} recettes`;
        recipeCardsContainer.appendChild(totalRecipesElement);
    }
  });


function updateRecipeDisplay(recipes) {
  recipeCardsContainer.innerHTML = '';

  for (let i = 0; i < recipes.length; i++) {
    const card = recipes[i];
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

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
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