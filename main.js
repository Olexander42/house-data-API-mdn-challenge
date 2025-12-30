import { initForm, getFilteredProps } from "./filters.js";
import { initHouseCardTemplate, getUniquePropsKeys } from "./template.js";
import handleSubmit from "./handleSearch.js";

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
console.log(templateCard);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const filteredProps = getFilteredProps();
  handleSubmit(event, filteredProps, data, housePropsKeys, templateCard);
}); 

