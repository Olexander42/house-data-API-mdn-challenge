import { populateCard } from "../handleSearch.js";
import { expectedCardDOM, obj, expectedUniquePropsKeys as propsKeys, expectedCardTemplateDOM as cardTemplateDom } from "./fixture.js";
import { isNodesSame } from "./utils.js";


const expectedCard = document.createElement('article');
expectedCard.innerHTML = expectedCardDOM;

const cardTemplate = document.createElement('article');
cardTemplate.innerHTML = cardTemplateDom;
const actualCard = populateCard(obj, propsKeys, cardTemplate);

test("Card is populated correctly", () => {
  expect(isNodesSame(expectedCard, actualCard)).toBe(true);
})