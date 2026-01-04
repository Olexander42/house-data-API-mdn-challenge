import { isArrsMatch } from "./utils.js";
import { data, expectedUniquePropsKeys } from "./fixture.js";
import { retrieveUniquePropsKeys } from "../getters.js";

test ("Unique Object's Properties from Data are retrieved correctly", () => {
  expect(isArrsMatch(expectedUniquePropsKeys, retrieveUniquePropsKeys(data))).toBe(true);
})