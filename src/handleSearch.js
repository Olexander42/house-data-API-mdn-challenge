let output;
let searchResult;

export default function handleSearch(event, selectedOptions, data, objPropsKeys, templateCard) {
  event.preventDefault(); 

  
  searchResult = data.filter((obj) => isObjMatchesFilters(obj, selectedOptions));

  if (!output) output = document.getElementById("output");
  renderCard(searchResult[0], objPropsKeys, templateCard);

  document.getElementById("result-count")
    .textContent = `Results returned: ${searchResult.length}`;
}

/**
 * Matches each selected option with obj's correspondent property's value.
 * @param {Object<string, string>} obj - an item in database
 * @param {Array<string>} selectedOptions - passed by form
 * @returns {Boolean} 
 */
function isObjMatchesFilters(obj, selectedOptions) {
  const relevantFiltersNames = selectedOptions.filter(
    ([filterName, selectedOption]) => {
      return selectedOption.trim().length > 0; // exclude not selected filters
  });
 
  for (const [filterName, selectedOption] of relevantFiltersNames) {
    const objPropValue = String(obj[filterName]);
    if (selectedOption !== objPropValue) return false;
  }

  return true;
} 

function renderCard(obj, objPropsKeys, templateCard) {
  const newCard = templateCard.cloneNode(true);

  objPropsKeys.forEach((objPropKey) => {
    const optionEl = newCard.querySelector(`.${objPropKey}`);
    const optionVal = obj[objPropKey];
    optionEl.textContent = optionVal;
  })

  output.append(newCard);
}

export { isObjMatchesFilters }; // for testing










