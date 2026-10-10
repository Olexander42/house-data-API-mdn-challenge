import initCardTemplate from "../../src/init/initTemplate.js";
import { expectedUniquePropsKeys as propsKeys, expectedCardTemplate, outputSection } from "../fixture.js";
import { isNodesSame } from "../utils.js";


document.body.innerHTML = outputSection;

test("Card template is generated correctly", () => {
  const actualCardTemplate = initCardTemplate(propsKeys);
  expect(isNodesSame(expectedCardTemplate, actualCardTemplate)).toBe(true);
})
