import initCardTemplate from "../../src/init/initTemplate.js";
import { expectedUniquePropsKeys as propsKeys, expectedCardTemplate, divTemplatesEl } from "../fixture.js";
import { isNodesSame } from "../utils.js";


document.body.append(divTemplatesEl);

test("Card template is generated correctly", () => {
  const actualCardTemplate = initCardTemplate(propsKeys);
  expect(isNodesSame(expectedCardTemplate, actualCardTemplate)).toBe(true);
})

test("Wrong `mainProp` is rejected", () => {
  expect(() => initCardTemplate(["price", "bedrooms"], "bedroom")).toThrow()
})
