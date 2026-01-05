import { properify } from "../utils.js";

export const filtersNames = ["street", "bedrooms", "bathrooms"];

export const expectedFiltersOptions = {
  [filtersNames[0]]: ["Maple Avenue", "Tavistock Road"],
  [filtersNames[1]]: ["3", "4"],
  [filtersNames[2]]: ["1", "2"],
}

export const expectedUniquePropsKeys = [
  "price",
  filtersNames[0],
  "house_number",
  filtersNames[1],
  filtersNames[2],
  "room_sizes",
  ,
]

export const data = [
  {
    "price": 360000,
    [filtersNames[0]]: getFilterOption(0, 0),
    "house_number": "1",
    [filtersNames[1]]: getFilterOption(1, 0),
    [filtersNames[2]]: getFilterOption(2, 0),
    "room_sizes": {
      "bedroom1": 12,
      "bedroom2": 15,
    },
    
  },
  {
    "price": 480000,
    [filtersNames[0]]: getFilterOption(0, 1),
    "house_number": "12",
    [filtersNames[1]]: getFilterOption(1, 1),
    [filtersNames[2]]: getFilterOption(2, 1),
    "room_sizes": {
      "bedroom1": 14,
      "bedroom2": 12,
    },
  }
]

export const initialFormDOM = `
  <select id="${filtersNames[0]}-filter" name="${filtersNames[0]}-filter">
    <option value="">All options</option>
  </select>
  <select id="${filtersNames[1]}-filter" name="${filtersNames[1]}-filter">
    <option value="">All options</option>
  </select>
  <select id="${filtersNames[2]}-filter" name="${filtersNames[2]}-filter">
    <option value="">All options</option>
  </select>
`

export const expectedFormDOM =  `
  <select id="${filtersNames[0]}-filter" name="${filtersNames[0]}-filter">
    <option value="">All options</option>
    <option value="${getFilterOption(0, 0)}">${getFilterOption(0, 0)}</option>
    <option value="${getFilterOption(0, 1)}">${getFilterOption(0, 1)}</option>
  </select>
  <select id="${filtersNames[1]}-filter" name="${filtersNames[1]}-filter">
    <option value="">All options</option>
    <option value="${getFilterOption(1, 0)}">${getFilterOption(1, 0)}</option>
    <option value="${getFilterOption(1, 1)}">${getFilterOption(1, 1)}</option>
  </select>
  <select id="${filtersNames[2]}-filter" name="${filtersNames[2]}-filter">
    <option value="">All options</option>
    <option value="${getFilterOption(2, 0)}">${getFilterOption(2, 0)}</option>
    <option value="${getFilterOption(2, 1)}">${getFilterOption(2, 1)}</option>
  </select>
`

const propsKeys = expectedUniquePropsKeys;

export const expectedCardTemplateDOM = `
  <h2 data-label="${properify(propsKeys[0])}"></h2>
  <ul>
    <li data-label="${properify(propsKeys[1])}"></li>
    <li data-label="${properify(propsKeys[2])}"></li>
    <li data-label="${properify(propsKeys[3])}"></li>
    <li data-label="${properify(propsKeys[4])}"></li>
    <li data-label="${properify(propsKeys[5])}"></li>
  </ul>
`

export const obj = data[0];

export const expectedCardDOM = `
  <h2 data-label="${properify(propsKeys[0])}">${obj[propsKeys[0]]}</h2>
  <ul>
    <li data-label="${properify(propsKeys[1])}">${obj[propsKeys[1]]}</li>
    <li data-label="${properify(propsKeys[2])}">${obj[propsKeys[2]]}</li>
    <li data-label="${properify(propsKeys[3])}">${obj[propsKeys[3]]}</li>
    <li data-label="${properify(propsKeys[4])}">${obj[propsKeys[4]]}</li>
    <li data-label="${properify(propsKeys[5])}">${obj[propsKeys[5]]}</li>
  </ul>
`

export function getFilterOption(nameIndex, optionIndex) {
  return expectedFiltersOptions[filtersNames[nameIndex]][optionIndex];
}







