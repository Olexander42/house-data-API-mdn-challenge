import "@testing-library/jest-dom"

import handleSearch from "../../src/handleSearch.js"

import { data, SELECTED_OPTIONS_CONFIGS, expectedUniquePropsKeys as propsKeys, expectedCardTemplate as cardTemplate, card1, card2 } from "../fixture.js";
import { isNodesSame } from "../utils.js";

import type { SelectedOptions } from "../../src/common/types.js";

document.body.innerHTML = "";

const resultCountEl = document.createElement('p');
resultCountEl.id = "result-count";

const outputEl = document.createElement('section');
outputEl.id = "output";

document.body.append(resultCountEl, outputEl); 

function pressSearch(selectedOptions: SelectedOptions): void {
  handleSearch({
    event: new SubmitEvent("submit"),
    data,
    selectedOptions,
    objPropsKeys: propsKeys,
    cardTemplate,
    resultCountEl,
    outputEl
  }) 
}

suite("Search output is rendered correctly", () => {
  suite("No filters applied", () => {
    beforeAll(() => {
      pressSearch(SELECTED_OPTIONS_CONFIGS.noFilters);
      pressSearch(SELECTED_OPTIONS_CONFIGS.noFilters);
    })

    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count")!;
     
      expect(actualSearchCount).toHaveTextContent(`Results returned: ${data.length}`);
    })
    
    
    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      
      const actualSection = document.getElementById("output")!;

      expectedSection.append(card1, card2);
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);

      expectedSection.innerHTML = "";
      expectedSection.append(card1);      
      expect(isNodesSame(expectedSection, actualSection)).toBe(false);
    })


  })

  suite("Filters are applied", () => {
    beforeAll(() => {
      pressSearch(SELECTED_OPTIONS_CONFIGS.noFilters);
      pressSearch(SELECTED_OPTIONS_CONFIGS.matchSecond);
    })

    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count");
      if (!actualSearchCount) throw new Error("No '#result-count' was found");
      
      expect(actualSearchCount).toHaveTextContent(`Results returned: 1`);
    })

    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      
      const actualSection = document.getElementById("output");
      if (!actualSection) throw new Error("No '#output' was found");

      expectedSection.append(card2);
      
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);

      expectedSection.innerHTML = "";
      expectedSection.append(card1);      
      expect(isNodesSame(expectedSection, actualSection)).toBe(false);
    })
  })
})
