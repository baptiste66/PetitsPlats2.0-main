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

ingredientsSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ingredientsOptions, searchText);

        // Ajoute la classe "delete" si la barre de recherche est vide
        if (searchText === '') {
            closeIngredient.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeIngredient.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});

applianceSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(applianceOptions, searchText);

        // Ajoute la classe "delete" si la barre de recherche est vide
        if (searchText === '') {
            closeAppliance.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeAppliance.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});

ustensilsSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ustensilsOptions, searchText);

        // Ajoute la classe "delete" si la barre de recherche est vide
        if (searchText === '') {
            closeUtensils.forEach(closeButton => closeButton.classList.add('delete'));
        } else {
            closeUtensils.forEach(closeButton => closeButton.classList.remove('delete'));
        }
    });
});

closeIngredient.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        // Réinitialise la barre de recherche et supprime la classe "delete"
        ingredientsSearch.forEach(input => {
            input.value = '';
            filterOptions(ingredientsOptions, '');
            closeButton.classList.add('delete');
        });
    });
});

closeAppliance.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        // Réinitialise la barre de recherche et supprime la classe "delete"
        applianceSearch.forEach(input => {
            input.value = '';
            filterOptions(applianceOptions, '');
            closeButton.classList.add('delete');
        });
    });
});

closeUtensils.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        // Réinitialise la barre de recherche et supprime la classe "delete"
        ustensilsSearch.forEach(input => {
            input.value = '';
            filterOptions(ustensilsOptions, '');
            closeButton.classList.add('delete');
        });
    });
});

window.addEventListener('load', function () {
    // Si la barre de recherche est vide, ajoute la classe "delete" aux boutons close
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