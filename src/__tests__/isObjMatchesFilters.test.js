import { isObjMatchesFilters } from "../handleSearch.js";
import { filtersNames, getFilterOption, data } from "./fixture.js";


describe("Data objects are matched correctly", () => {
  const SELECTED_OPTIONS_CONFIGS = {
    noFilters: [
      [filtersNames[0], ""], 
      [filtersNames[1], ""],
      [filtersNames[2], ""],
    ],

    matchSecond: [
      [filtersNames[0], getFilterOption(0, 1)],
      [filtersNames[1], getFilterOption(1, 1)],
      [filtersNames[2], getFilterOption(2, 1)],
    ],
  }

  const firstObj = data[0];
  const secondObj = data[1];

  test("Matches if no filters are applied", () => {
    data.forEach((obj) => {
      expect(isObjMatchesFilters(obj, SELECTED_OPTIONS_CONFIGS.noFilters)).toBe(true);
    })
  })

  test("Not matches correctly", () => {
    expect(isObjMatchesFilters(firstObj, SELECTED_OPTIONS_CONFIGS.matchSecond)).toBe(false);
  })

  test("Matches correctly", () => {
    expect(isObjMatchesFilters(secondObj, SELECTED_OPTIONS_CONFIGS.matchSecond)).toBe(true);
  })
})


