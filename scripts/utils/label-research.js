const ingredientsOptions = document.querySelectorAll('#ingredientsList option');
const applianceOptions = document.querySelectorAll('#appliancesList option');
const ustensilsOptions = document.querySelectorAll('#utensilsList option');
const ingredientsSearch = document.querySelectorAll('#ingredientsSearchInput');
const applianceSearch = document.querySelectorAll('#appliancesSearchInput');
const ustensilsSearch = document.querySelectorAll('#utensilsSearchInput');


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
    });
});

applianceSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(applianceOptions, searchText);
    });
});

ustensilsSearch.forEach(input => {
    input.addEventListener('input', () => {
        const searchText = input.value;
        filterOptions(ustensilsOptions, searchText);
    });
});
