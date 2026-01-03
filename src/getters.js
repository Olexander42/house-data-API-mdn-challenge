export function retrieveSelectedOptions(formData) {
  const allSelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }

  return allSelectedOptions;
}

export function retrieveUniquePropsKeys(data) {
  const objPropsKeys = new Set();

  data.forEach((obj) => Object.keys(obj).forEach((key) => objPropsKeys.add(key)));
  
  return [...objPropsKeys];
}


