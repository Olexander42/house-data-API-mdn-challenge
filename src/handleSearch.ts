import { properify } from "./common/utils.js";

import type { APIResponse, SelectedOptions, DataUnit } from "./common/types.js";


type HandleSearchInput = {
  event: SubmitEvent,
  selectedOptions: SelectedOptions,
  data: APIResponse,
  objPropsKeys: string[],
  cardTemplate: HTMLElement,
  resultCountEl: HTMLParagraphElement,
  outputEl: HTMLElement,
}

/** Renders a search result. */
export default function handleSearch(
  { event, selectedOptions, data, objPropsKeys, cardTemplate, outputEl, resultCountEl }: HandleSearchInput
): void {
  event.preventDefault();

  const searchResult = data.filter((obj) => isObjMatchesFilters(obj, selectedOptions));

  resultCountEl.textContent = `Results returned: ${searchResult.length}`;
  
  outputEl.innerHTML = "";
  searchResult.forEach((result) => {    
    const card = populateCard(result, objPropsKeys, cardTemplate);    
    outputEl.append(card);
  })
}

function isObjMatchesFilters(obj: DataUnit, selectedOptions: SelectedOptions): boolean {
  const relevantFilters = Object.entries(selectedOptions).filter(
    ([_filterName, selectedOption]) => selectedOption.trim().length > 0); // Not selected options are empty strings "".
 
  for (const [filterName, selectedOption] of relevantFilters) {
    const objPropValue = String(obj[filterName]);
    if (selectedOption !== objPropValue) {
      return false; 
    }
  }

  return true;
} 

function populateCard(obj: DataUnit, objPropsKeys: string[], cardTemplate: HTMLElement) {
  const card = cardTemplate.cloneNode(true) as HTMLElement;
  
  objPropsKeys.forEach((objPropKey) => {
    const selector = `[data-label="${properify(objPropKey)}"]`;    
    const propEl = card.querySelector(selector);
    if (!propEl) throw new Error(`${selector} query yielded no result. 'propEl' is 'null'`);
    const propVal = String(obj[objPropKey]);
    propEl.textContent = propVal;
  })
  
  return card;
}

export { isObjMatchesFilters, populateCard }; // for testing









