import { isSameLength, isArrsMatch, isNodesSame } from "../utils.ts";
import { filtersNames, initialFormDOM, expectedFiltersOptions, data, expectedFormDOM} from "../fixture.ts";
import { formData, initFiltersProps, initFiltersOptions, populateFiltersOptions } from "../../src/init/initForm.ts";


document.body.innerHTML = initialFormDOM;
const selectElements = [...document.querySelectorAll('select')];
initFiltersProps(selectElements);

describe("formData is initialized correctly", () => {
  const selectElements = [...document.querySelectorAll('select')];

  const filtersDataNames: readonly string[] = Object.keys(formData);
  const filtersDataSelectEls = Object.values(formData).map(({ el }) => el)

  test("selectElements has the same length", () => {
    return expect(isSameLength(formData, selectElements)).toBe(true)
  });

  test("Keys are initialized correctly", () => {
    return expect(isArrsMatch(filtersNames, filtersDataNames)).toBe(true)
  });

  test("Els are initialized correctly", () => {
    return expect(isArrsMatch(selectElements, filtersDataSelectEls)).toBe(true)
  });
})

initFiltersOptions(data);

test("Filter's options are found correctly", () => {
  const isOptionsMatch = () => {
    return Object.entries(expectedFiltersOptions).every(([filterName, list]) => {
      const options: readonly string[] = formData[filterName].options;

      return isSameLength(list, options) && isArrsMatch(list, options);
    })
  }
  
  expect(isOptionsMatch()).toBe(true);
})


const expectedForm = document.createElement('form');
expectedForm.innerHTML = expectedFormDOM;
populateFiltersOptions();

test("Options are populated correctly", () => {
  expect(isNodesSame(expectedForm, document.body)).toBe(true);
})






















