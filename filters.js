const filtersData = {};

export function initForm(data) {
  initAllFiltersEls();
  findAllFiltersOptions(data);
  populateAllFiltersOptions();
}

export function getSelectedOptions() {
  const allSelectedOptions = {};

  for (const [filterName, { el }] of Object.entries(filtersData)) {
    const selectedOption = el.value;
    if (selectedOption) allSelectedOptions[filterName] = selectedOption;
  }

  return allSelectedOptions;
}

function initAllFiltersEls() {
  // Filters' names are hardcoded in HTML
  const allSelectElements = [...document.querySelectorAll('select')];
  allSelectElements.forEach((selectEl) => initSingleFilter(selectEl)); 

  function initFilterEl(selectEl) {
    const purifiedName = select.id.replace("-filter", "");
    filtersData[purifiedName] = { el: selectEl };
  }
}

function findAllFiltersOptions(data) {
  for (const [filterName, filterData] of Object.entries(filtersData)) {
    filterData.options = findSingleFilterAllOptions(filterName)
  }
  
  function findFilterAllOptions(filterName) {
    const options = [];

    for (const obj of data) {
      const option = obj[filterName]
      if (!options.includes(option)) options.push(option);
    }

    return options.sort();
  }
}

function populateAllFiltersOptions() {
  Object.values(filtersData).forEach(({ el, options }) => populateSingleFilterOptions(el, options));

  function populateFilterOptions(el, options) {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionEl.textContent = option;
      el.append(optionEl);
    })
  }
}

// TODO: write tests


