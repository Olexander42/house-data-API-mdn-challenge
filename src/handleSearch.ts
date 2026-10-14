import { properify } from "./common/utils.js";

import type { APIResponse, SelectedOptions, DataUnit } from "./common/types.js";
import { attachSummaryListeners } from "./ui/attachSummaryListeners.js";


type HandleSearchInput = {
  selectedOptions: SelectedOptions,
  data: APIResponse,
  objPropsKeys: string[],
  cardTemplate: HTMLElement,
  resultCountEl: HTMLParagraphElement,
  outputEl: HTMLElement,
}

/** Renders a search result. */
export default function handleSearch(
  { selectedOptions, data, objPropsKeys, cardTemplate, outputEl, resultCountEl }: HandleSearchInput
): void {
  const searchResult = data.filter((obj) => isObjMatchesFilters(obj, selectedOptions));

  resultCountEl.textContent = `Results returned: ${searchResult.length}`;
  
  outputEl.innerHTML = "";
  searchResult.forEach((result) => {    
    const card = populateCard(result, objPropsKeys, cardTemplate);    
    outputEl.append(card);
  })

  attachSummaryListeners();
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

let detailsTemplate: HTMLElement;

function populateCard(obj: DataUnit, objPropsKeys: string[], cardTemplate: HTMLElement) {
  const card = cardTemplate.cloneNode(true) as HTMLElement;
  
  objPropsKeys.forEach((objPropKey) => {
    const selector = `[data-label="${properify(objPropKey)}"]`;    
    const propEl = card.querySelector(selector);
    if (!propEl) throw new Error(`${selector} query yielded no result. 'propEl' is 'null'`);
    const propVal = obj[objPropKey];
    if (typeof propVal !== 'object') propEl.textContent = String(propVal);
    else {      
      detailsTemplate ??= (() => {
        const expandableTemplate = document.querySelector("#expandable") as HTMLTemplateElement;      
        
        return expandableTemplate.content.firstElementChild as HTMLElement;
      })()

      const detailsEl = document.importNode(detailsTemplate, true);
      const listEl = detailsEl.querySelector('ul') as HTMLUListElement;

      Object.entries(propVal!).forEach(([key, val]) => {        
        const listItemEl = document.createElement('li');
        listItemEl.textContent = `${key}: ${val}`;
        
        listEl.append(listItemEl);
      });
      
      propEl.append(detailsEl);
    }
  })
  
  return card;
}

export { isObjMatchesFilters, populateCard }; // for testing









