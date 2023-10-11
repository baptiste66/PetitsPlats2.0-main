function addSearchInputToSelect(selectId) {
    const select = document.getElementById(selectId);

    if (select) {
        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Rechercher...');
        searchInput.addEventListener('input', function () {
            const filter = searchInput.value.toLowerCase();
            const options = select.getElementsByTagName('option');

            for (const option of options) {
                if (option.value.toLowerCase().includes(filter) || option.textContent.toLowerCase().includes(filter)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            }
        });

       
        const label = document.createElement('label');
        label.appendChild(searchInput);

     
        select.parentNode.replaceChild(label, select);
        
      
        label.appendChild(select);
    }
}


addSearchInputToSelect('ingrédients');
addSearchInputToSelect('appareils');
addSearchInputToSelect('ustensiles');
