const filtersData = {};

export function initForm(data) {
  initAllFiltersProps();
  findAllFiltersOptions(data);
  populateAllFiltersOptions();
}

export function getFilteredProps() {
  const allFilteredProps = {};

  for (const [filterName, { el }] of Object.entries(filtersData)) {
    const selectedOption = el.value;
    if (selectedOption) allFilteredProps[filterName] = selectedOption;
  }

  return allFilteredProps;
}

function initAllFiltersProps() {
  const initFilterProp = (selectEl) => {
    const purifiedName = selectEl.id.replace("-filter", "");
    filtersData[purifiedName] = { el: selectEl };
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

  for (const [filterKey, filterValue] of Object.entries(filtersData)) {
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

  Object.values(filtersData).forEach(({ el, options }) => populateFilterOptions(el, options));
}


export { filtersData, initAllFiltersProps, findAllFiltersOptions }; // for testing