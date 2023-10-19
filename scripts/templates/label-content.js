import { cardDetails } from '../models/data-Card.js';

const labelIngredient = document.querySelector('#ingredients');
const labelUstensils = document.querySelector('#ustensils');
const labelAppliance = document.querySelector('#appliance');



const uniqueIngredients = [];
const uniqueUstensils = [];
const uniqueAppliance = [];

// push ingredient in label 
cardDetails.forEach(label => {
  label.ingredients.forEach(ingredient => {
    if (!uniqueIngredients.includes(ingredient.ingredient)) {
      uniqueIngredients.push(ingredient.ingredient);
    }
  });
});

uniqueIngredients.sort();

uniqueIngredients.forEach(ingredient => {
  const option = document.createElement('option');
  option.textContent = ingredient;
  labelIngredient.appendChild(option);
});

// for ustensils
cardDetails.forEach(label => {
    label.ustensils.forEach(ustensils => {
      if (!uniqueUstensils.includes(ustensils)) {
        uniqueUstensils.push(ustensils);
      }
    });
  });
  uniqueUstensils.sort();
  
  uniqueUstensils.forEach(ustensils => {
    const option = document.createElement('option');
    option.textContent = ustensils;
    labelUstensils.appendChild(option);
  });
  // for appliances 
  cardDetails.forEach(label => {
    if (!uniqueAppliance.includes(label.appliance)) {
        uniqueAppliance.push(label.appliance);
    }
});

uniqueAppliance.sort();

uniqueAppliance.forEach(appliance => {
    const option = document.createElement('option');
    option.textContent = appliance;
    labelAppliance.appendChild(option);
});