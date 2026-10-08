import "@testing-library/jest-dom"

import handleSearch from "../../src/handleSearch.js"

import { data, SELECTED_OPTIONS_CONFIGS, expectedUniquePropsKeys as propsKeys, expectedCardTemplate as cardTemplate, card1, card2 } from "../fixture.js";
import { isNodesSame } from "../utils.js";


function resetDOM() {
  document.body.innerHTML = "";

  const searchCount = document.createElement('p');
  searchCount.id = "result-count";

  const actualSection = document.createElement('section');
  actualSection.id = "output";

  document.body.append(searchCount, actualSection);  
}

suite("Search output is rendered correctly", () => {
  suite("No filters applied", () => {
    beforeAll(() => {
      resetDOM();

      handleSearch({
        event: new SubmitEvent("submit"),
        data,
        selectedOptions: SELECTED_OPTIONS_CONFIGS.noFilters,
        objPropsKeys: propsKeys,
        cardTemplate
      })      
    }) 

    test("The search count is correct", () => {
      const actualSearchCount = document.getElementById("result-count");
      if (!actualSearchCount) throw new Error("No '#result-count' was found");
     
      expect(actualSearchCount).toHaveTextContent(`Results returned: ${data.length}`);
    })
    
    
    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      
      const actualSection = document.getElementById("output");
      if (!actualSection) throw new Error("No '#output' was found");

      expectedSection.append(card1, card2);
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);

      expectedSection.innerHTML = "";
      expectedSection.append(card1);      
      expect(isNodesSame(expectedSection, actualSection)).toBe(false);
    })
  })

  suite("Filters are applied", () => {
    beforeAll(() => {
      resetDOM();

      handleSearch({
        event: new SubmitEvent("submit"),
        data,
        selectedOptions: SELECTED_OPTIONS_CONFIGS.matchSecond,
        objPropsKeys: propsKeys,
        cardTemplate
      })      
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
