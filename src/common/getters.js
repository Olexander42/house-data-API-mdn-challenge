/**
 * @param {import("./types.js").FiltersData} formData
 * @returns {{[filterName:string]: string}} One `selected` option value per filter
 */
export function retrieveSelectedOptions(formData) {
  /** @type {{ [filterName: string]: string }} */
  const allSelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }
 
  return allSelectedOptions;
}

/**
 * @param {import("./types.js").APIResponse} data 
 * @returns {string[]} 
 */
export function retrieveUniquePropsKeys(data) {
  const uniquePropsKeys = new Set();

  data.forEach((dataUnit) => {
    const propertyNames = Object.keys(dataUnit);
    propertyNames.forEach((propertyName) => uniquePropsKeys.add(String(propertyName))); 
  })
  
  return [...uniquePropsKeys];
}