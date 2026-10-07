import type { APIResponse, FiltersData } from "../common/types.ts";


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

function initFiltersOptions(data: APIResponse): void {
  for (const [filterName, filterData] of Object.entries(formData)) {
    filterData.options = ((filterName) => {
      const options: string[] = [];

      for (const obj of data) {
        const option = String(obj[filterName]);
        if (!options.includes(option)) {
          options.push(option);
        }
      }

      return options.sort();
    })(filterName);
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