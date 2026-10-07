import { populateCard } from "../../src/handleSearch.js";
import { expectedCardTemplate, expectedCard, obj, expectedUniquePropsKeys as propsKeys,  } from "../fixture.js";
import { isNodesSame } from "../utils.js";


const actualCard = populateCard(obj, propsKeys, expectedCardTemplate);

test("Card is populated correctly", () => {
  expect(isNodesSame(expectedCard, actualCard)).toBe(true);
})
