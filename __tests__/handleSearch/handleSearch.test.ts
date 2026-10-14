import "@testing-library/jest-dom"

import handleSearch from "../../src/handleSearch.js"

import { data, SELECTED_OPTIONS_CONFIGS, expectedUniquePropsKeys as propsKeys, expectedCardTemplate as cardTemplate, expectedCard1, expectedCard2, resultCountEl, outputEl, divTemplatesEl } from "../fixture.js";
import { isNodesSame } from "../utils.js";

import type { SelectedOptions } from "../../src/common/types.js";

document.body.append(resultCountEl, outputEl, divTemplatesEl); 

function pressSearch(selectedOptions: SelectedOptions): void {
  handleSearch({
    data,
    selectedOptions,
    objPropsKeys: propsKeys,
    cardTemplate,
    resultCountEl,
    outputEl
  }) 
}

suite("Search output is rendered correctly", () => {
  suite("Match all", () => {
    beforeAll(() => {
      pressSearch(SELECTED_OPTIONS_CONFIGS.matchNone);
      pressSearch(SELECTED_OPTIONS_CONFIGS.noFilters);
    })

    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count")!;
      
      expect(actualSearchCount).toHaveTextContent(`Results returned: ${data.length}`);
    })
    
    
    test("Output is rendered correctly", () => {
      const expectedSection = document.createElement('section');
      const actualSection = document.getElementById("output")!;
      console.log(actualSection.innerHTML);
      
      expectedSection.append(expectedCard1, expectedCard2);
     
      

      expect(isNodesSame(expectedSection, actualSection)).toBe(true);
    })
  })

  suite("Match something", () => {
    beforeAll(() => {
      pressSearch(SELECTED_OPTIONS_CONFIGS.noFilters);
      pressSearch(SELECTED_OPTIONS_CONFIGS.matchSecond);
    })
 
    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count") as HTMLParagraphElement;
      
      expect(actualSearchCount).toHaveTextContent("Results returned: 1");
    })

    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      const actualSection = document.getElementById("output") as HTMLElement;

      expectedSection.append(expectedCard2);
      
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);

    })
  })

  suite("Match none", () => {
    beforeAll(() => {
      pressSearch(SELECTED_OPTIONS_CONFIGS.matchNone);
      pressSearch(SELECTED_OPTIONS_CONFIGS.matchNone);
    })


    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count") as HTMLParagraphElement;
      
      expect(actualSearchCount).toHaveTextContent("Results returned: 0");
    })

    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      const actualSection = document.getElementById("output") as HTMLElement;
      
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);
    })
  })
})
