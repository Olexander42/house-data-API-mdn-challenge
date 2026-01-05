const formData = {}

export function initForm(data) {
  initAllFiltersProps();
  findAllFiltersOptions(data);
  populateAllFiltersOptions();
}

function initAllFiltersProps() {
  const initFilterProp = (selectEl) => {
    const purifiedName = selectEl.id.replace("-filter", "");
    formData[purifiedName] = { el: selectEl };
  }

  // Filters' names are hardcoded in HTML
  const allSelectElements = [...document.querySelectorAll('select')];
  allSelectElements.forEach((selectEl) => initFilterProp(selectEl)); 
}

function findAllFiltersOptions(data) {
  const findFilterAllOptions = (filterName) => {
    const options = [];

    for (const obj of data) {
      const option = obj[filterName]
      if (!options.includes(option)) options.push(option);
    }

    return options.sort();
  }

  for (const [filterKey, filterValue] of Object.entries(formData)) {
    filterValue.options = findFilterAllOptions(filterKey)
  }
}

function populateAllFiltersOptions() {
  const populateFilterOptions = (el, options) => {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionEl.textContent = option;
      el.append(optionEl);
    })
  }

  Object.values(formData).forEach(({ el, options }) => populateFilterOptions(el, options));
}


export { formData, initAllFiltersProps, findAllFiltersOptions, populateAllFiltersOptions }; // for testing