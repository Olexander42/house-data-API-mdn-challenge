import { isSameLength, normalizeHTML } from "../utils.js";
import { filtersData, initAllFiltersProps, findAllFiltersOptions, populateAllFiltersOptions } from "../initForm.js";


const filtersNames = ["street", "bedrooms", "bathrooms"];

document.body.innerHTML = `
  <select id="${filtersNames[0]}-filter" name="${filtersNames[0]}-filter"></select>
  <select id="${filtersNames[1]}-filter" name="${filtersNames[1]}-filter"></select>
  <select id="${filtersNames[2]}-filter" name="${filtersNames[2]}-filter"></select>
`

const selectElements = [...document.querySelectorAll('select')];

initAllFiltersProps();
const filtersDataNames = Object.keys(filtersData);
const filtersDataSelectEls = Object.values(filtersData).map(({ el }) => el)

const isNamesMatch = () => filtersNames.every((name, i) => name === filtersDataNames[i]);
const isElsMatch = () => selectElements.every((selectEl, i) => selectEl === filtersDataSelectEls[i]);

describe("filtersData is initialized correctly", () => {
  test("selectElements has the same length", () => {
    return expect(isSameLength(Object.entries(filtersData), selectElements)).toBe(true)
  });
  test("Keys are initialized correctly", () => expect(isNamesMatch()).toBe(true));
  test("Els are initialized correctly", () => expect(isElsMatch()).toBe(true));
})


const expectedFiltersOptions = {
  [filtersNames[0]]: ["Tavistock Road", "Maple Avenue"].sort(),
  [filtersNames[1]]: [4, 3].sort(),
  [filtersNames[2]]: [1, 2].sort(),
}

const getFilterOption = (nameIndex, optionIndex) => {
  return expectedFiltersOptions[filtersNames[nameIndex]][optionIndex];
}

const data = [
  {
    "house_number": "1",
    [filtersNames[0]]: getFilterOption(0, 0),
    [filtersNames[1]]: getFilterOption(1, 0),
    [filtersNames[2]]: getFilterOption(2, 0),
    "room_sizes": {
      "bedroom1": 12,
      "bedroom2": 15,
    },
    "price": 360000
  },
  {
    "house_number": "12",
    [filtersNames[0]]: getFilterOption(0, 1),
    [filtersNames[1]]: getFilterOption(1, 1),
    [filtersNames[2]]: getFilterOption(2, 1),
    "room_sizes": {
      "bedroom1": 14,
      "bedroom2": 12,
    },
    "price": 480000
  }
]

const isOptionsMatch = () => {
  return Object.entries(expectedFiltersOptions).every(([filterName, list]) => {
    const options = filtersData[filterName].options;

    return isSameLength(list, options) && list.every((value, i) => value === options[i]);
  })
}

findAllFiltersOptions(data);

test("Filter's options are found correctly", () => {
  expect(isOptionsMatch()).toBe(true);
})


const expectedDOM = document.body.attachShadow({ mode: 'open' });

expectedDOM.innerHTML = `
  <select id="${filtersNames[0]}-filter" name="${filtersNames[0]}-filter">
    <option value="${getFilterOption(0, 0)}">${getFilterOption(0, 0)}</option>
    <option value="${getFilterOption(0, 1)}">${getFilterOption(0, 1)}</option>
  </select>
  <select id="${filtersNames[1]}-filter" name="${filtersNames[1]}-filter">
    <option value="${getFilterOption(1, 0)}">${getFilterOption(1, 0)}</option>
    <option value="${getFilterOption(1, 1)}">${getFilterOption(1, 1)}</option>
  </select>
  <select id="${filtersNames[2]}-filter" name="${filtersNames[2]}-filter">
    <option value="${getFilterOption(2, 0)}">${getFilterOption(2, 0)}</option>
    <option value="${getFilterOption(2, 1)}">${getFilterOption(2, 1)}</option>
  </select>
`

populateAllFiltersOptions();

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

test("Options are populated correctly", () => {
  expect(isNodesSame()).toBe(true);
})
















