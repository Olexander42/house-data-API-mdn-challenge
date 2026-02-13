import "@testing-library/jest-dom"

import { data, SELECTED_OPTIONS_CONFIGS, expectedUniquePropsKeys as propsKeys, expectedCardTemplate as cardTemplate, card1, card2 } from "../fixture.js";
import { isNodesSame } from "../utils.js";

import handleSearch from "../../src/handleSearch.js"

function resetDOM() {
  document.body.innerHTML = "";

  const searchCount = document.createElement('p');
  searchCount.id = "result-count";

  const actualSection = document.createElement('section');
  actualSection.id = "output";

  document.body.append(searchCount, actualSection);  
}


describe("Search output is rendered correctly", () => {
  describe("No filters applied", () => {
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
      expect(actualSearchCount).not.toHaveTextContent(`Results returned: ${data.length + 1}`);
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

  describe("Filters are applied", () => {
    beforeAll(() => {
      resetDOM();
      console.log("DOM has been reset");
      
      handleSearch({
        event: new SubmitEvent("submit"),
        data,
        selectedOptions: SELECTED_OPTIONS_CONFIGS.matchSecond,
        objPropsKeys: propsKeys,
        cardTemplate
      })

      console.log("Output inside 'beforeAll'", document.getElementById("output")?.innerHTML);
      
    }) 

    test("The search count is correct", () => {
      console.log("Output right after 'beforeAll', inside first test", document.getElementById("output")?.innerHTML);
      const actualSearchCount = document.getElementById("result-count");
      if (!actualSearchCount) throw new Error("No '#result-count' was found");
      
      expect(actualSearchCount).toHaveTextContent(`Results returned: 1`);
      expect(actualSearchCount).not.toHaveTextContent(`Results returned: 2}`);
    })

    test("Cards are rendered correctly", () => {
      const expectedSection = document.createElement('section');
      
      const actualSection = document.getElementById("output");
      if (!actualSection) throw new Error("No '#output' was found");

      expectedSection.append(card2);
      /*
      console.log("expectedSection");
      console.log(expectedSection.innerHTML);
      console.log("__________________");
      console.log("actualSection");
      console.log(actualSection.innerHTML);
      */
      
      
      expect(isNodesSame(expectedSection, actualSection)).toBe(true);

      expectedSection.innerHTML = "";
      expectedSection.append(card2, card1);      
      expect(isNodesSame(expectedSection, actualSection)).toBe(false);
    })
  })
})
