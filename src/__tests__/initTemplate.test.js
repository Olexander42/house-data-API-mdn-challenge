import initCardTemplate, { properify } from "../initTemplate.js";
import { expectedUniquePropsKeys as propsKeys } from "./fixture.js";
import { isNodesSame } from "./utils.js";


document.body.innerHTML = `    
  <section id="output">
    <template>
      <article>
        <ul></ul>
      </article>
    </template>
  </section>
`

const expectedArticle = document.createElement('article');
expectedArticle.innerHTML = `
  <h2 data-label="${properify(propsKeys[0])}"></h2>
  <ul>
    <li data-label="${properify(propsKeys[1])}"></li>
    <li data-label="${properify(propsKeys[2])}"></li>
    <li data-label="${properify(propsKeys[3])}"></li>
    <li data-label="${properify(propsKeys[4])}"></li>
    <li data-label="${properify(propsKeys[5])}"></li>
  </ul>
`
const cardTemplate = initCardTemplate(propsKeys);
const actualArticle = cardTemplate.firstElementChild;

test("Card template is generated correctly", () => {
  expect(isNodesSame(expectedArticle, actualArticle)).toBe(true);
})