import { retrieveUniquePropsKeys, retrieveSelectedOptions  } from "./src/getters.js";
import { initForm } from "./src/initForm.js";
import populateCardTemplate from "./src/initTemplate.js";
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

const objPropsKeys = retrieveUniquePropsKeys(data);
const templateCard = populateCardTemplate(objPropsKeys);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const selectedOptions = retrieveSelectedOptions();
  handleSearch(event, selectedOptions, data, objPropsKeys, templateCard);
}); 

