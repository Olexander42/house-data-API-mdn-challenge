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

let housesProps;

export default function renderHouses(event, selectedOptions, data) {
  event.preventDefault(); 

  const filtersNames = Object.keys(selectedOptions);

  const searchResult = data.filter((house) => isHouseMatchesFilters(house, filtersNames, selectedOptions));

  housesProps = Object.keys(searchResult[0]); // any house suffices 
  // continue refactoring from here
  const mainProp = housesProps.includes("price") ? "price" 
    : housesProps.includes("street") ? "street"
    : "";

  const templateCard = initHouseCardTemplate(housesProps, mainProp);
  
  renderHouse(aHouse, housesProps, templateCard);



  resultCount.textContent = `Results returned: ${searchResult.length}`;
}

function isHouseMatchesFilters(house, filtersNames, selectedOptions) {
  for (const filterName of filtersNames) {
    if (!(String(house[filterName]) === selectedOptions[filterName])) {
      return false;
    }
  }

  return true;
} 

function renderHouse(house, props, templCard) {
  const newCard = templCard.cloneNode(true);

  props.forEach((prop) => {
    const propClass = `.${standardize(prop)}`;
    const cleanPropName = `${cleanup(prop)}`;
    const propValue = house[prop];

    const listItem = newCard.querySelector(propClass);
    listItem.textContent = `${cleanPropName}: ${propValue}`;
  })

  output.append(newCard);
}

function initHouseCardTemplate(propsKeys, mainProp) {
  initTemplateEls();

  propsKeys = propsKeys.map((key) => key.toLowerCase().trim().replace("_", "-"));
 
  h2.classList.add(mainProp);
  h2.dataset.
 
  housesProps.splice(housesProps.indexOf(mainProp), 1); // don't repeat the property in the list
  propsKeys.forEach((key) => {
    const listItem = document.createElement('li');

    listItem.classList.add(standardize(key));
    
    propsList.append(listItem);
  })

  return template;
}

const standardize = (str) => str.toLowerCase().trim().replace("_", "-");
const cleanup = (str) => standardize(str).replace("-", " ");






