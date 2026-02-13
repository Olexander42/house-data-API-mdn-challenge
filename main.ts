import { formData, initForm } from "./src/init/initForm.js";
import { retrieveSelectedOptions, retrieveUniquePropsKeys } from "./src/common/getters.js";
import populateCardTemplate from "./src/init/initTemplate.js";
import handleSearch from "./src/handleSearch.js";

import type { APIResponse } from "./src/common/types.js";

const url = 'https://mdn.github.io/shared-assets/misc/houses.json'; 

export let data: APIResponse;

try {
  const response = await fetch(url);
  data = await response.json();
} catch(error) {
  throw new Error;
}

initForm(data);

const objPropsKeys = retrieveUniquePropsKeys(data);
const cardTemplate = populateCardTemplate(objPropsKeys);

const form = document.querySelector('form')!;

form.addEventListener('submit', (event) => {
  const selectedOptions = retrieveSelectedOptions(formData);

  handleSearch({
    event,
    selectedOptions,
    data,
    objPropsKeys,
    cardTemplate
  })
})
