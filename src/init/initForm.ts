import type { APIResponse, DataUnit, FiltersData } from "../common/types.ts";


export const formData: FiltersData = {};

/** Runs once API response has been received. */
export function initForm(data: APIResponse): void {
  const selectElements = [...document.querySelectorAll('select')];
  initFiltersProps(selectElements);

  initFiltersOptions(data);
  populateFiltersOptions();
}

/** Initializes `formData` properties mapping filter names to their select elements. */
function initFiltersProps(selectElements: HTMLSelectElement[]): void {
  selectElements.forEach((selectEl) => {
    const purifiedName = selectEl.id.replace("-filter", "");
    formData[purifiedName] = { el: selectEl, options: [] };
  }); 
}

/** Go through API response and collect filters options'  unique values */
function initFiltersOptions(data: APIResponse): void {
  for (const [filterName, filterData] of Object.entries(formData)) {
    const options = data.map((dataUnit: DataUnit) => String(dataUnit[filterName]));
    const uniqueOptions = [...new Set(options)];
    filterData.options = uniqueOptions.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
}

function populateFiltersOptions(): void {
  Object.values(formData).forEach(({ el, options }) => {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = optionEl.textContent = option;
      el.append(optionEl);
    })
  });
}


export { initFiltersProps, initFiltersOptions, populateFiltersOptions }; // for testing