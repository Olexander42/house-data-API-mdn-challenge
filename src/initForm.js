const filtersData = {};

export function initForm(data) {
  initAllFiltersEls();
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

function initAllFiltersEls() {
  const initFilterEl = (selectEl) => {
    const purifiedName = selectEl.id.replace("-filter", "");
    filtersData[purifiedName] = { el: selectEl };
  }

  // Filters' names are hardcoded in HTML
  const allSelectElements = [...document.querySelectorAll('select')];
  allSelectElements.forEach((selectEl) => initFilterEl(selectEl)); 
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

  for (const [filterName, filterData] of Object.entries(filtersData)) {
    filterData.options = findFilterAllOptions(filterName)
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

// TODO: write tests


