import type { FiltersData, SelectedOptions, APIResponse } from "./types.js";


export function retrieveSelectedOptions(formData: FiltersData): SelectedOptions {
  const allSelectedOptions: SelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }
 
  return allSelectedOptions;
}

export function retrieveUniquePropsKeys(data: APIResponse): [string, ...string[]] {
  const uniquePropsKeys = new Set<string>();

  data.forEach((dataUnit) => {
    const propertyNames = Object.keys(dataUnit);
    propertyNames.forEach((propertyName) => uniquePropsKeys.add(propertyName)); 
  })

  const result = [...uniquePropsKeys];

  function isEmpty(arr: string[]): asserts arr is [string, ...string[]] {
    if (arr.length === 0) {
      throw new Error("No unique properties have been found in the data")
    }
  }

  isEmpty(result);

  return result;
}