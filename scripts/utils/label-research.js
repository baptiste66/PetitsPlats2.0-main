const ingredientsOptions = document.querySelectorAll('#ingredientsList option');
const applianceOptions = document.querySelectorAll('#appliancesList option');
const ustensilsOptions = document.querySelectorAll('#utensilsList option');
const ingredientsSearch = document.querySelectorAll('#ingredientsSearchInput');
const applianceSearch = document.querySelectorAll('#appliancesSearchInput');
const ustensilsSearch = document.querySelectorAll('#utensilsSearchInput');
const closeAppliance = document.querySelectorAll('.closebutton-appliance')
const closeIngredient = document.querySelectorAll('.closebutton-ingredients')
const closeUtensils = document.querySelectorAll('.closebutton-utensils')

function filterOptions(options, searchText) {
    searchText = searchText.toLowerCase();

    options.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(searchText)) {
            option.style.display = ''; 
        } else {
            option.style.display = 'none'; 
        }
    });
}
//Ingredient search management
ingredientsSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ingredientsOptions, searchText);

        
        if (searchText === '') {
            closeIngredient.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeIngredient.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});
//appliance search management
applianceSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(applianceOptions, searchText);

        
        if (searchText === '') {
            closeAppliance.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeAppliance.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});
//ustensils search management
ustensilsSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ustensilsOptions, searchText);

        
        if (searchText === '') {
            closeUtensils.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeUtensils.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});
//reset search bar for 
closeIngredient.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        
        ingredientsSearch.forEach(input => {
            input.value = '';
            filterOptions(ingredientsOptions, '');
            closeButton.classList.add('delete');
        });
    });
});
//reset search bar for 
closeAppliance.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        
        applianceSearch.forEach(input => {
            input.value = '';
            filterOptions(applianceOptions, '');
            closeButton.classList.add('delete');
        });
    });
});
//reset search bar for 
closeUtensils.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        
        ustensilsSearch.forEach(input => {
            input.value = '';
            filterOptions(ustensilsOptions, '');
            closeButton.classList.add('delete');
        });
    });
});
// reset button for f5
window.addEventListener('load', function () {
   
    ingredientsSearch.forEach(input => {
        if (input.value === '') {
            closeIngredient.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });

    applianceSearch.forEach(input => {
        if (input.value === '') {
            closeAppliance.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });

    ustensilsSearch.forEach(input => {
        if (input.value === '') {
            closeUtensils.forEach(closeButton => closeButton.classList.add('delete'));
        }
    });
});