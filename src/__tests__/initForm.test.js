import { isSameLength, isArrsMatch, isNodesSame } from "./utils.js";
import { filtersNames, initialDOM, expectedFiltersOptions, data, finalDOM} from "./fixture.js";
import { formData, initAllFiltersProps, findAllFiltersOptions, populateAllFiltersOptions } from "../initForm.js";


document.body.innerHTML = initialDOM;
initAllFiltersProps();

describe("formData is initialized correctly", () => {
  const selectElements = [...document.querySelectorAll('select')];

  const filtersDataNames = Object.keys(formData);
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


findAllFiltersOptions(data);

test("Filter's options are found correctly", () => {
  const isOptionsMatch = () => {
    return Object.entries(expectedFiltersOptions).every(([filterName, list]) => {
      const options = formData[filterName].options;

      return isSameLength(list, options) && isArrsMatch(list, options);
    })
  }
  
  expect(isOptionsMatch()).toBe(true);
})


const expectedDOM = document.createElement('div');
expectedDOM.innerHTML = finalDOM;
populateAllFiltersOptions();

test("Options are populated correctly", () => {
  expect(isNodesSame(expectedDOM, document.body)).toBe(true);
})




















