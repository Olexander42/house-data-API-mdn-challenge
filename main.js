import { initForm, getFilteredProps } from "./src/initForm.js";
import { initHouseCardTemplate, getUniquePropsKeys } from "./src/initTemplate.js";
import handleSearch from "./src/handleSearch.js";

const url = 'https://mdn.github.io/shared-assets/misc/houses.json'; 
let data;

try {
  const response = await fetch(url);
  data = await response.json();
} catch(error) {
  console.error(error);
}

initForm(data);

const housePropsKeys = getUniquePropsKeys(data);
const templateCard = initHouseCardTemplate(housePropsKeys);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const filteredProps = getFilteredProps();
  handleSearch(event, filteredProps, data, housePropsKeys, templateCard);
}); 

