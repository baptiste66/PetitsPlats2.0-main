import { cardDetails } from '../models/data-Card.js';

const labelIngredient = document.querySelector('#ingredientsList');
const labelUstensils = document.querySelector('#utensilsList');
const labelAppliance = document.querySelector('#appliancesList');

const uniqueIngredients = [];
const uniqueUstensils = [];
const uniqueAppliance = [];


const filterButtons = document.querySelectorAll('.filterBtn');
const filter = document.querySelector('.filterList');

filterButtons.forEach(filterButton => {
  filterButton.addEventListener('click', () => {
    if (filterButton.classList.contains('active')) {
      filterButton.classList.remove('active');
    } else {
      filterButton.classList.add('active');
    }
  });

  const searchInput = filterButton.querySelector('.filterInput');
  searchInput.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});


// Push ingredient in label
cardDetails.forEach(label => {
  label.ingredients.forEach(ingredient => {
    if (!uniqueIngredients.includes(ingredient.ingredient)) {
      uniqueIngredients.push(ingredient.ingredient);
    }
  });
});

uniqueIngredients.forEach(ingredient => {
  const option = document.createElement('option');
  option.textContent = ingredient;
  labelIngredient.appendChild(option);
});

// For ustensils
cardDetails.forEach(label => {
  label.ustensils.forEach(ustensils => {
    if (!uniqueUstensils.includes(ustensils)) {
      uniqueUstensils.push(ustensils);
    }
  });
});

uniqueUstensils.forEach(ustensils => {
  const formattedUstensils = ustensils.charAt(0).toUpperCase() + ustensils.slice(1);
  const option = document.createElement('option');
  option.textContent = formattedUstensils;
  labelUstensils.appendChild(option);
});

// For appliances
cardDetails.forEach(label => {
  if (!uniqueAppliance.includes(label.appliance)) {
    uniqueAppliance.push(label.appliance);
  }
});

uniqueAppliance.forEach(appliance => {
  const option = document.createElement('option');
  option.textContent = appliance;
  labelAppliance.appendChild(option);
});
