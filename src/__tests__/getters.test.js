import { isSameLength } from "../utils.js";
import { filtersNames, finalDOM } from "./fixture.js";
import { getSelectedOptions } from "../getters.js";


test("Selected options are identified correctly", () => {
  document.body.innerHTML = finalDOM;

  const filter1Select = document.getElementById(`${filtersNames[0]}-filter`);
  const filter2Select = document.getElementById(`${filtersNames[1]}-filter`);
  const filter3Select = document.getElementById(`${filtersNames[2]}-filter`);

  const formData = {
    [filtersNames[0]]: { el: filter1Select },
    [filtersNames[1]]: { el: filter2Select },
    [filtersNames[2]]: { el: filter3Select },
  }

  const expectedSelectedOptions = (() => {
    const filter1Options = [...filter1Select.getElementsByTagName('option')];
    const filter2Options = [...filter2Select.getElementsByTagName('option')];
    const filter3Options = [...filter3Select.getElementsByTagName('option')];

    filter1Options[1].selected = true;
    filter2Options[2].selected = true;
    filter2Options[0].selected = true;

    return {
      [filtersNames[0]]: filter1Select.value,
      [filtersNames[1]]: filter2Select.value,
      [filtersNames[2]]: filter3Select.value,
    }
  })();

  const selectedOptions = getSelectedOptions(formData); // returns object { filter name: selected value, ... }

  const isSelectValuesSame = () => {
    return Object.entries(expectedSelectedOptions).every(([select, value]) => {
      return selectedOptions[select] === value;
    })
  }
  
  expect(isSameLength(expectedSelectedOptions, selectedOptions)).toBe(true);
  expect(isSelectValuesSame()).toBe(true);
})