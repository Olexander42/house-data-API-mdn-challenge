import type { FiltersData, SelectedOptions, APIResponse } from "./types.js";


export function retrieveSelectedOptions(formData: FiltersData): SelectedOptions {
  const allSelectedOptions: SelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }
 
  return allSelectedOptions;
}

export function retrieveUniquePropsKeys(data: APIResponse): string[] {
  const uniquePropsKeys = new Set<string>();

  data.forEach((dataUnit) => {
    const propertyNames = Object.keys(dataUnit);
    propertyNames.forEach((propertyName) => uniquePropsKeys.add(String(propertyName))); 
  })
  
  return [...uniquePropsKeys];
}