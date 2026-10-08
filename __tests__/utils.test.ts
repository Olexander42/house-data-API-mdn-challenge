import { isArrsMatch, isNodesSame, isSameLength, toNormalizedHTML } from "./utils.js"


test("isSameLength works correctly", () => {
  expect(isSameLength({ "prop1": 1 }, { "prop0": 0 })).toBe(true);
  expect(isSameLength({ "prop1": 1 }, { "prop0": 0, "prop2": 2 })).toBe(false);
  expect(isSameLength({ "prop1": 1 }, {})).toBe(false);
})

test("isArrsMatch works correctly", () => {
  expect(isArrsMatch([1, 2], [1, 2])).toBe(true);
  expect(isArrsMatch([1, 2], [1, 3])).toBe(false);
  expect(isArrsMatch([1, 2], [1, 2, 1])).toBe(false);
})


describe("The DOM tests work correctly", () => {
  const prettyHTML = `
    <select id="street-filter" name="street-filter">
      <option value="">All options</option>
    </select>
  `;
  const uglyHTML = `
    <select id="street-filter" name="street-filter">

          <option value="">   All options   </option>

    </select>
  `;
  const correctNormalizedHTML = `<select id="street-filter" name="street-filter"><option value="">All options</option></select>`;
  
  test("toNormalizedHMTL works correctly", () => {
    expect(toNormalizedHTML(prettyHTML)).toBe(correctNormalizedHTML);
    expect(toNormalizedHTML(uglyHTML)).toBe(correctNormalizedHTML);
  })
  
  test("isNodesSame works correctly", () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    div1.innerHTML = prettyHTML;
    div2.innerHTML = uglyHTML;

    const differentHTML = `<select id="price-filter" name="price-filter"><option value="">All options</option></select>`;
    div3.innerHTML = differentHTML;

    expect(isNodesSame(div1, div2)).toBe(true);
    expect(isNodesSame(div1, div3)).toBe(false);
  })
})


 


