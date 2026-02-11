import { formData, initForm } from "./src/init/initForm.ts";
import { retrieveSelectedOptions, retrieveUniquePropsKeys } from "./src/common/getters.ts";
import populateCardTemplate from "./src/init/initTemplate.ts";
import handleSearch from "./src/handleSearch.ts";

import type { APIResponse } from "./src/common/types.ts";

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
