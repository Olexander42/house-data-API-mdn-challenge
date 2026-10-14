import { populateCard } from "../../src/handleSearch.js";
import { expectedCardTemplate, expectedCard1, obj, expectedUniquePropsKeys as propsKeys, divTemplatesEl,  } from "../fixture.js";
import { isNodesSame } from "../utils.js";


document.body.append(divTemplatesEl)

const actualCard = populateCard(obj, propsKeys, expectedCardTemplate);

test("Card is populated correctly", () => {
  expect(isNodesSame(expectedCard1, actualCard)).toBe(true);

})

const empryCardTemplate = document.createElement('article');

test("Throws if faulty card template is given", () => {
  expect(() => populateCard(obj, propsKeys, empryCardTemplate)).toThrow();
})



