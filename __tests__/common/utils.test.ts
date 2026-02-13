import { properify } from "../../src/common/utils.js"

test("`properify` works correctly", () => {
  expect(properify("proper_name")).toBe("Proper name");
  expect(properify("proper-name")).toBe("Proper name");
})

