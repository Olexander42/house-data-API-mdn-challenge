let resultCount, output;

let relevantFiltersNames;
let searchResult;

export default function handleSearch(event, selectedOptions, data, objPropsKeys, templateCard) {
  event.preventDefault(); 

  relevantFiltersNames = Object.keys(selectedOptions);
  searchResult = data.filter((obj) => isHouseMatchesFilters(obj, selectedOptions));

  if (!output) initOutputEls();
  renderHouse(searchResult[0], objPropsKeys, templateCard);

  resultCount.textContent = `Results returned: ${searchResult.length}`;
}

function isHouseMatchesFilters(obj, selectedOptions) {
  for (const filterName of relevantFiltersNames) {
    const selectedOption = selectedOptions[filterName];
    const housePropValue = String(obj[filterName]);

    if (selectedOption !== housePropValue) return false;
  }

  return true;
} 

function renderHouse(obj, objPropsKeys, templateCard) {
  const newCard = templateCard.cloneNode(true);

  objPropsKeys.forEach((objPropKey) => {
    const optionEl = newCard.querySelector(`.${objPropKey}`);
    const optionVal = obj[objPropKey];
    optionEl.textContent = optionVal;
  })

  output.append(newCard);
}

function initOutputEls() {
  resultCount = document.getElementById("result-count");
  output = document.getElementById("output");
}









