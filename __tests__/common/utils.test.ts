import { properify } from "../../src/common/utils.js"


test("'properify' works correctly", () => {
  expect(properify("_proper_name-and-more-")).toBe("Proper name and more");
  expect(properify(" ")).toBe("")
  expect(properify("___----  ")).toBe("");
})


