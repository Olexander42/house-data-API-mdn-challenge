import { retrieveUniquePropsKeys, retrieveSelectedOptions } from "./src/common/getters.js";
import { initForm, formData } from "./src/init/initForm.js";
import populateCardTemplate from "./src/init/initTemplate.js";
import handleSearch from "./src/handleSearch.js";


const url = 'https://mdn.github.io/shared-assets/misc/houses.json'; 

/** @type {import("./src/common/types").APIResponse} */
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
  const selectedOptions = retrieveSelectedOptions(formData);
  handleSearch(event, selectedOptions, data, objPropsKeys, templateCard);
});