const filters = {};

export function initForm(data) {
  initAllFilters();
  getAllOptions(data);
  populateAllFiltersOptions();
}

export function getSelectedOptions() {
  const selectedOptions = {};

  for (const [filterName, { el }] of Object.entries(filters)) {
    if (el.value !== "") selectedOptions[filterName] = el.value;
  }

  return selectedOptions;
}

function initAllFilters() {
  // Filters' names are hardcoded in HTML
  const selects = [...document.querySelectorAll('select')];
  selects.forEach((select) => initFilter(select)); 

  function initFilter(select) {
    const purifiedName = select.id.replace("-filter", "");
    filters[purifiedName] = { el: select };
  }
}

function getAllOptions(data) {
  for (const [filterName, filterData] of Object.entries(filters)) {
    filterData.options = getFilterOptions(filterName)
  }
  
  function getFilterOptions(filterName) {
    const options = [];

    for (const house of data) {
      const option = house[filterName]
      if (!options.includes(option)) options.push(option);
    }

    return options.sort();
  }
}

function populateAllFiltersOptions() {
  Object.values(filters).forEach(({ el, options }) => appendOptions(el, options));

  function populateFilterOptions(el, options) {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionEl.textContent = option;
      el.append(optionEl);
    })
  }
}



