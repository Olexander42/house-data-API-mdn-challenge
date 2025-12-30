let resultCount, output;

let relevantFiltersNames;
let searchResult;

export default function handleSubmit(event, filteredProps, data, housePropsKeys, templateCard) {
  event.preventDefault(); 

  relevantFiltersNames = Object.keys(filteredProps);
  searchResult = data.filter((house) => isHouseMatchesFilters(house, filteredProps));

  if (!output) initOutputEls();
  renderHouse(searchResult[0], housePropsKeys, templateCard);

  resultCount.textContent = `Results returned: ${searchResult.length}`;
}

function isHouseMatchesFilters(house, filteredProps) {
  for (const filterName of relevantFiltersNames) {
    const selectedOption = filteredProps[filterName];
    const housePropValue = String(house[filterName]);

    if (!(selectedOption === housePropValue)) return false;
  }

  return true;
} 

function renderHouse(house, housePropsKeys, templateCard) {
  const newCard = templateCard.cloneNode(true);

  housePropsKeys.forEach((housePropKey) => {
    const optionEl = newCard.querySelector(`.${housePropKey}`);
    const optionVal = house[housePropKey];
    optionEl.textContent = optionVal;
  })

  output.append(newCard);
}

function initOutputEls() {
  resultCount = document.getElementById("result-count");
  output = document.getElementById("output");
}









