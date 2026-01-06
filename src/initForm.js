/**
 * @type {import("./types").FiltersData}
 */
const formData = {};

/** 
 * Runs once an API response has been received.
 * @param {import("./types").APIResponse} data
 * @returns {void} Mutates the module-level formData
 */
export function initForm(data) {
  const selectElements = [...document.querySelectorAll('select')];
  initFiltersProps(selectElements);

  initFiltersOptions(data);
  populateFiltersOptions();
}

/**
 * Initializes `formData` properties mapping filter names to their select elements.
 * @param {HTMLSelectElement[]} selectElements - Queried from the document
 * @returns {void} Mutates the module-level formData
 */
function initFiltersProps(selectElements) {
  selectElements.forEach((selectEl) => {
    const purifiedName = selectEl.id.replace("-filter", "");
    formData[purifiedName] = { el: selectEl };
    }); 
}

/** 
 * @param {import("./types").APIResponse} data
 * @returns {void} Mutates the module-level formData
 */
function initFiltersOptions(data) {
  for (const [filterName, filterData] of Object.entries(formData)) {
    filterData.options = ((filterName) => {
      /** @type {string[]} */
      const options = [];

      for (const obj of data) {
        const option = String(obj[filterName]);
        if (!options.includes(option)) options.push(option);
      }

      return options.sort();
    })(filterName);
  }
}

/** @returns {void} Mutates the `form` DOM */
function populateFiltersOptions() {
  Object.values(formData).forEach(({ el, options }) => {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionEl.textContent = option;
      el.append(optionEl);
    })
  });
}


export { formData, initFiltersProps, initFiltersOptions, populateFiltersOptions }; // for testing