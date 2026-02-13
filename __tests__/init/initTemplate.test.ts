import populateCardTemplate from "../../src/init/initTemplate.js";
import { expectedUniquePropsKeys as propsKeys, expectedCardTemplateDOM } from "../fixture.js";
import { isNodesSame } from "../utils.js";


test("Card template is generated correctly", () => {
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
  
  expect(isNodesSame(expectedTemplate, actualTemplate)).toBe(true);
})
