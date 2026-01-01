import { filtersData, initAllFiltersProps, findAllFiltersOptions } from "../initForm.js";


const names = ["street", "bedrooms", "bathrooms"];

document.body.innerHTML = `
  <select id="${names[0]}-filter" name="${names[0]}-filter"></select>
  <select id="${names[1]}-filter" name="${names[1]}-filter"></select>
  <select id="${names[2]}-filter" name="${names[2]}-filter"></select>
`

const selectElements = [...document.querySelectorAll('select')];

initAllFiltersProps();
const filtersDataNames = Object.keys(filtersData);
const filtersDataSelectEls = Object.values(filtersData).map(({ el }) => el)

const isSameLength = () => Object.entries(filtersData).length === selectElements.length;
const isNamesMatch = () => names.every((name, i) => name === filtersDataNames[i]);
const isElsMatch = () => selectElements.every((selectEl, i) => selectEl === filtersDataSelectEls[i]);

describe("filtersData is initialized correctly", () => {
  test("selectElements has the same length", () => expect(isSameLength()).toBe(true));
  test("Keys are initialized correctly", () => expect(isNamesMatch()).toBe(true));
  test("Els are initialized correctly", () => expect(isElsMatch()).toBe(true));
})


const data =  [
  {
    "house_number": "1",
    "street": "Tavistock Road",
    "bedrooms": 4,
    "bathrooms": 2,
    "room_sizes": {
      "bedroom1": 12,
      "bedroom2": 15,
    },
    "price": 360000
  },
  {
    "house_number": "12",
    "street": "Maple Avenue",
    "bedrooms": 3,
    "bathrooms": 1,
    "room_sizes": {
      "bedroom1": 14,
      "bedroom2": 12,
    },
    "price": 480000
  }
]


const expectedFiltersOptions = [
  [`${names[0]}`, ["Maple Avenue", "Tavistock Road"]],
  [`${names[1]}`, [3, 4]],
  [`${names[2]}`, [1, 2]],
]

findAllFiltersOptions(data);

const isOptionsMatch = () => {
  return expectedFiltersOptions.every(([filterName, list]) => {
    const options = filtersData[filterName].options;
    const isSameLength = list.length === options.length;
    return isSameLength && list.every((value, i) => value === options[i]);
  })
}

test("Filter's options are found correctly", () => {
  expect(isOptionsMatch()).toBe(true);
})










