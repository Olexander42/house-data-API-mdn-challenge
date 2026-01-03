export const filtersNames = ["street", "bedrooms", "bathrooms"];

export const initialDOM = `
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

export const expectedFiltersOptions = {
  [filtersNames[0]]: ["Tavistock Road", "Maple Avenue"].sort(),
  [filtersNames[1]]: [4, 3].sort(),
  [filtersNames[2]]: [1, 2].sort(),
}

export const data = [
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

export const finalDOM =  `
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

function getFilterOption(nameIndex, optionIndex) {
  return expectedFiltersOptions[filtersNames[nameIndex]][optionIndex];
}
