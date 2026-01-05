import { properify } from "./utils.js";


let output;
let searchResult;

export default function handleSearch(event, selectedOptions, data, objPropsKeys, templateCard) {
  event.preventDefault(); 

  
  searchResult = data.filter((obj) => isObjMatchesFilters(obj, selectedOptions));

  if (!output) output = document.getElementById("output");
  populateCard(searchResult[0], objPropsKeys, templateCard);

  document.getElementById("result-count")
    .textContent = `Results returned: ${searchResult.length}`;
}

/**
 * Matches each filter's selected option with obj's correspondent property's value.
 * @param {Object<string, string|number>} obj - an item in database
 * @param {Array<[string, string]>} selectedOptions - passed by form
 * @returns {boolean}
 */
function isObjMatchesFilters(obj, selectedOptions) {
  const relevantFilters = selectedOptions.filter(
    ([filterName, selectedOption]) => {
      return selectedOption.trim().length > 0; // exclude not selected filters
  });
 
  for (const [filterName, selectedOption] of relevantFilters) {
    const objPropValue = String(obj[filterName]);
    if (selectedOption !== objPropValue) return false;
  }

  return true;
} 

function populateCard(obj, objPropsKeys, templateCard) {
  const card = templateCard.cloneNode(true);

  objPropsKeys.forEach((objPropKey) => {
    const optionEl = card.querySelector(`[data-label="${properify(objPropKey)}"]`);
    const optionVal = obj[objPropKey];
    optionEl.textContent = optionVal;
  })

  return card;
}

export { isObjMatchesFilters, populateCard }; // for testing










