import { isObjMatchesFilters } from "../../src/handleSearch.js";
import { data, SELECTED_OPTIONS_CONFIGS } from "../fixture.js";


describe("Data objects are matched correctly", () => {


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
