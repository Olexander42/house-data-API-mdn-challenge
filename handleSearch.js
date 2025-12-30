let resultCount, output;
const initResultEls = () => {
  resultCount = document.getElementById("result-count");
  output = document.getElementById("output");
}

let template, h2, propsList;
const initTemplateEls = () => {
  const templateEl = document.querySelector("#output template");

  template = document.importNode(templateEl.content, true);
  h2 = template.querySelector('h2');
  propsList = template.querySelector('ul');
} 

let relevantFiltersNames;
let searchResult;

export default function handleSubmit(event, selectedOptions, data) {
  event.preventDefault(); 

  relevantFiltersNames = Object.keys(selectedOptions);
  searchResult = data.filter((house) => isHouseMatchesFilters(house, selectedOptions));

  resultCount.textContent = `Results returned: ${searchResult.length}`;
}

function isHouseMatchesFilters(house, selectedOptions) {
  for (const filterName of relevantFiltersNames) {
    const selectedOption = selectedOptions[filterName];
    const housePropValue = String(house[filterName]);

    if (!(selectedOption === housePropValue)) return false;
  }

  return true;
} 

function renderAllHouses(selectedOptions) {
  const housesPropsKeys = Object.keys(searchResult[0]); // any house suffices
  const templateCard = initHouseCardTemplate(housesPropsKeys);

  renderHouse(searchResult[0], housesPropsKeys, templateCard);

}

function renderHouse(house, housesPropsKeys, templateCard) {
  const newHouseCard = templateCard.cloneNode(true);

  housesPropsKeys.forEach((prop) => {
    const propClass = `.${standardize(prop)}`;
    const cleanPropName = `${cleanup(prop)}`;
    const propValue = house[prop];

    const listItem = newHouseCard.querySelector(propClass);
    listItem.textContent = `${cleanPropName}: ${propValue}`;
  })

  output.append(newHouseCard);
}

function initHouseCardTemplate(housesPropsKeys) {
  initTemplateEls();

  housesPropsKeys = housesPropsKeys.map((key) => key.toLowerCase().trim().replace("_", "-"));
  
  housesPropsKeys.splice(housesPropsKeys.indexOf("price"), 1); // don't include "price" in the list
  housesPropsKeys.forEach((key) => {
    const listItem = document.createElement('li');

    listItem.classList.add(standardize(key));
    
    propsList.append(listItem);
  })

  return template;
}

const standardize = (str) => str.toLowerCase().trim().replace("_", "-");
const cleanup = (str) => standardize(str).replace("-", " ");






