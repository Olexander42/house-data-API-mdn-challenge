import populateCardTemplate from "../../src/init/initTemplate.ts";
import { expectedUniquePropsKeys as propsKeys, expectedCardTemplateDOM } from "../fixture.ts";
import { isNodesSame } from "../utils.ts";


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
