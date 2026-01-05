import populateCardTemplate from "../initTemplate.js";
import { expectedUniquePropsKeys as propsKeys, expectedCardTemplateDOM } from "./fixture.js";
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

const expectedTemplate = document.createElement('article');
expectedTemplate.innerHTML = expectedCardTemplateDOM;

const cardTemplate = populateCardTemplate(propsKeys);
const actualTemplate = cardTemplate;

test("Card template is generated correctly", () => {
  expect(isNodesSame(expectedTemplate, actualTemplate, '*', true)).toBe(true);
})