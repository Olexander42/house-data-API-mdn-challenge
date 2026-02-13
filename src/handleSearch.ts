import { properify } from "./common/utils.js";

import type { APIResponse, SelectedOptions, DataUnit } from "./common/types.js";


let output: HTMLElement;
let searchResult: APIResponse;

type HandleSearchInput = {
  event: SubmitEvent,
  selectedOptions: SelectedOptions,
  data: APIResponse,
  objPropsKeys: string[],
  cardTemplate: HTMLElement
}

/** Renders a search result. */
export default function handleSearch(
  { event, selectedOptions, data, objPropsKeys, cardTemplate }: HandleSearchInput
): void {
  event.preventDefault();

  searchResult = data.filter((obj) => isObjMatchesFilters(obj, selectedOptions));

  output = output ?? document.getElementById("output");
  if (!output) throw new Error("Failed to get '#output' element");

  populateCard(searchResult[0], objPropsKeys, cardTemplate);

  const resultCount = document.getElementById("result-count");
  if (!resultCount) throw new Error("Failed to get '#result-count' element");
  resultCount.textContent = `Results returned: ${searchResult.length}`;
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
  const card = cardTemplate.cloneNode(true);

  objPropsKeys.forEach((objPropKey) => {
    const optionEl = card.querySelector(`[data-label="${properify(objPropKey)}"]`);
    const optionVal = obj[objPropKey];
    optionEl.textContent = optionVal;
  })

  return card;
}

export { isObjMatchesFilters, populateCard }; // for testing









