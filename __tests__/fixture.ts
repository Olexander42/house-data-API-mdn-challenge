import { properify } from "../src/common/utils.js";

import type { APIResponse, SelectedOptions } from "../src/common/types.js";
import type { AllowedIndexes } from "./types.js";


export const filtersNames = ["street", "bedrooms", "bathrooms"] as const;
const filtersOptions = [["Maple Avenue", "Tavistock Road"], ["3", "4"], ["1", "2"]] as const;

export const expectedFiltersOptions = {
  [filtersNames[0]]: filtersOptions[0],
  [filtersNames[1]]: filtersOptions[1],
  [filtersNames[2]]: filtersOptions[2],
} as const;

export const expectedUniquePropsKeys = [
  "price",
  filtersNames[0],
  "house_number",
  filtersNames[1],
  filtersNames[2],
  "room_sizes",
]

export const data: APIResponse  = [
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
] as const;

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
` as const

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
` as const

export const outputSection = `  
  <section id="output">
      <template>
        <article>
          <ul></ul>
        </article>
      </template>
    </section>
  `

const propsKeys = expectedUniquePropsKeys;

export const expectedCardTemplate = document.createElement('article');

const expectedCardTemplateDOM = `
  <h2 data-label="${properify(propsKeys[0])}"></h2>
  <ul>
    <li data-label="${properify(propsKeys[1])}"></li>
    <li data-label="${properify(propsKeys[2])}"></li>
    <li data-label="${properify(propsKeys[3])}"></li>
    <li data-label="${properify(propsKeys[4])}"></li>
    <li data-label="${properify(propsKeys[5])}"></li>
  </ul>
`

expectedCardTemplate.innerHTML = expectedCardTemplateDOM;

export const obj = data[0];

export const expectedCard = document.createElement('article');

const expectedCardDOM = `
<h2 data-label="${properify(propsKeys[0])}">${obj[propsKeys[0]]}</h2>
<ul>
  <li data-label="${properify(propsKeys[1])}">${obj[propsKeys[1]]}</li>
  <li data-label="${properify(propsKeys[2])}">${obj[propsKeys[2]]}</li>
  <li data-label="${properify(propsKeys[3])}">${obj[propsKeys[3]]}</li>
  <li data-label="${properify(propsKeys[4])}">${obj[propsKeys[4]]}</li>
  <li data-label="${properify(propsKeys[5])}">${obj[propsKeys[5]]}</li>
</ul>
`

expectedCard.innerHTML = expectedCardDOM;

export const SELECTED_OPTIONS_CONFIGS: Record<"noFilters" | "matchSecond", SelectedOptions> = {
  noFilters: {
    [filtersNames[0]]: "", 
    [filtersNames[1]]: "",
    [filtersNames[2]]: ""
  },

  matchSecond: {
    [filtersNames[0]]: getFilterOption(0, 1),
    [filtersNames[1]]: getFilterOption(1, 1),
    [filtersNames[2]]: getFilterOption(2, 1),
  },
};


type FiltersNamesIndexes = AllowedIndexes<typeof filtersNames>;
type FiltersOptionsIndexes = AllowedIndexes<typeof filtersOptions[0]>;

export function getFilterOption(nameIndex: FiltersNamesIndexes, optionIndex: FiltersOptionsIndexes): string {
  return expectedFiltersOptions[filtersNames[nameIndex]][optionIndex];
}


export const card1 = document.createElement('article');
export const card2 = document.createElement('article');

card1.innerHTML = `  
  <h2 data-label="Price">360000</h2>
    <ul>
      <li data-label="Street">Maple Avenue</li>
      <li data-label="House number">1</li>
      <li data-label="Bedrooms">3</li>
      <li data-label="Bathrooms">1</li>
      <li data-label="Room sizes">[object Object]</li>
    </ul>
`

card2.innerHTML = `  
  <h2 data-label="Price">480000</h2>
    <ul>
      <li data-label="Street">Tavistock Road</li>
      <li data-label="House number">12</li>
      <li data-label="Bedrooms">4</li>
      <li data-label="Bathrooms">2</li>
      <li data-label="Room sizes">[object Object]</li>
    </ul>
`




