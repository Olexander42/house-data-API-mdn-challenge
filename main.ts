import { formData, initForm } from "./src/init/initForm.js";
import { retrieveSelectedOptions, retrieveUniquePropsKeys } from "./src/common/getters.js";
import initCardTemplate from "./src/init/initTemplate.js";
import handleSearch from "./src/handleSearch.js";

import type { APIResponse } from "./src/common/types.js";

const url = 'https://mdn.github.io/shared-assets/misc/houses.json'; 

let data: APIResponse;

const response = await fetch(url);   
data = await response.json();

initForm(data);

/* The next values are declared outside 'handleSearch'
because they need to be declared only once. */
const objPropsKeys = retrieveUniquePropsKeys(data);
const cardTemplate = initCardTemplate(objPropsKeys, "price");

const formEl = document.querySelector('form') as HTMLFormElement;
const resultCountEl = document.getElementById("result-count") as HTMLParagraphElement;
const outputEl = document.getElementById("output") as HTMLElement;

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedOptions = retrieveSelectedOptions(formData);

  handleSearch({
    selectedOptions,
    data,
    objPropsKeys,
    cardTemplate,
    resultCountEl,
    outputEl
  })
})
