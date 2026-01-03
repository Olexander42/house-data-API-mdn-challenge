export function getSelectedOptions(formData) {
  const allSelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(formData)) {
    const selectedOption = el.value;
    allSelectedOptions[filterName] = selectedOption;
  }

  return allSelectedOptions;
}

