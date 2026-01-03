import { isSameLength, normalizeHTML } from "../utils.js";
import { filtersNames, initialDOM, expectedFiltersOptions, data, finalDOM} from "./fixture.js";
import { formData, initAllFiltersProps, findAllFiltersOptions, populateAllFiltersOptions } from "../initForm.js";


document.body.innerHTML = initialDOM;
initAllFiltersProps();

describe("formData is initialized correctly", () => {
  const selectElements = [...document.querySelectorAll('select')];

  const filtersDataNames = Object.keys(formData);
  const filtersDataSelectEls = Object.values(formData).map(({ el }) => el)

  const isNamesMatch = () => filtersNames.every((name, i) => name === filtersDataNames[i]);
  const isElsMatch = () => selectElements.every((selectEl, i) => selectEl === filtersDataSelectEls[i]);

  test("selectElements has the same length", () => {
    return expect(isSameLength(formData, selectElements)).toBe(true)
  });
  test("Keys are initialized correctly", () => expect(isNamesMatch()).toBe(true));
  test("Els are initialized correctly", () => expect(isElsMatch()).toBe(true));
})


findAllFiltersOptions(data);

test("Filter's options are found correctly", () => {
  const isOptionsMatch = () => {
    return Object.entries(expectedFiltersOptions).every(([filterName, list]) => {
      const options = formData[filterName].options;

      return isSameLength(list, options) && list.every((value, i) => value === options[i]);
    })
  }

  expect(isOptionsMatch()).toBe(true);
})


const expectedDOM = document.createElement('div');
expectedDOM.innerHTML = finalDOM;
populateAllFiltersOptions();

test("Options are populated correctly", () => {
  const isNodesSame = () => {
    const expectedNodes = [...expectedDOM.querySelectorAll('select')]
    const actualNodes = [...document.body.querySelectorAll('select')];

    if (!isSameLength(expectedNodes, actualNodes)) return false; 

    return expectedNodes.every((node, i) => {
      node.innerHTML = normalizeHTML(node.innerHTML);
      actualNodes[i].innerHTML = normalizeHTML(actualNodes[i].innerHTML);
      return node.isEqualNode(actualNodes[i]);
    });
  }

  expect(isNodesSame()).toBe(true);
})




















