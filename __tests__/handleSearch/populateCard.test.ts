import { populateCard } from "../../src/handleSearch.js";
import { expectedCardTemplate, expectedCard1, obj, expectedUniquePropsKeys as propsKeys,  } from "../fixture.js";
import { isNodesSame } from "../utils.js";


const actualCard = populateCard(obj, propsKeys, expectedCardTemplate);

test("Card is populated correctly", () => {
  expect(isNodesSame(expectedCard1, actualCard)).toBe(true);
})



