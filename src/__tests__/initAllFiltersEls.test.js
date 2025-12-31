import { describe, test, expect } from 'vitest';
import { initAllFiltersEls, filtersData } from "../initForm.js";


const names = ["street", "bedrooms", "room-sizes"];

document.body.innerHTML = `
  <select id="${names[0]}-filter" name="${names[0]}-filter"></select>
  <select id="${names[1]}-filter" name="${names[1]}-filter"></select>
  <select id="${names[2]}-filter" name="${names[2]}-filter"></select>
`

const selectElements = [...document.querySelectorAll('select')];
const length = selectElements.length;

function isNamesMatch() {
  const filtersDataNames = Object.keys(filtersData).map((key) => key);

  for (let i = 0; i < length; i++) {
    if (filtersDataNames[i] !== names[i]) return false;
  }

  return true;
}

function isElsMatch() {
  const filtersDataSelectEls = Object.values(filtersData).map(({ el }) => el);

  for (let i = 0; i < length; i++) {
    if (filtersDataSelectEls[i] !== selectElements[i]) return false;
  }

  return true;
}

describe("filtersData is initialized correctly", () => {
  initAllFiltersEls();
  if (Object.entries(filtersData).length !== length) return false;

  test("filtersData keys are initialized correctly", () => expect(isNamesMatch()).toBe(true));
  test("filtersData els are initialized correctly", () => expect(isElsMatch()).toBe(true));
})

