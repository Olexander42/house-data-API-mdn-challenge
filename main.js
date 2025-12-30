import { initForm, getSelectedOptions } from "./filters.js";
import { initHouseCardTemplate, getUniquePropsKeys } from "./template.js";
import renderHouses from "./handleSearch.js";

const url = 'https://mdn.github.io/shared-assets/misc/houses.json';
let housesData;

try {
  const response = await fetch(url);
  housesData = await response.json();
} catch(error) {
  console.error(error);
}

initForm(housesData);

const propsKeys = getUniquePropsKeys(housesData);
const templateCard = initHouseCardTemplate(propsKeys);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  renderHouses(event, getSelectedOptions(), housesData)
}); 

