/**
 * Iterates through each filter `select` element and extracts its `selected` val
 * @param {import("./types").FiltersData} formData
 * @returns {{[filterName:string]: string}} One `selected` option value per filter
 */
export function retrieveSelectedOptions(formData) {
  const allSelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }

  return allSelectedOptions;
}

/**
 * Iterates through the API response data units
 * and collects all unique property names.
 * @param {import("./types").APIResponse} data 
 * @returns {Array.<string>} 
 */
export function retrieveUniquePropsKeys(data) {
  const uniquePropsKeys = new Set();

  data.forEach((dataUnit) => {
    const propertyNames = Object.keys(dataUnit);
    propertyNames.forEach((propertyName) => uniquePropsKeys.add(String(propertyName))); 
  })
  
  return [...uniquePropsKeys];
}