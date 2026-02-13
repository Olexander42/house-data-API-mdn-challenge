import { isArrsMatch } from "../utils.ts";
import { data, expectedUniquePropsKeys } from "../fixture.ts";
import { retrieveUniquePropsKeys } from "../../src/common/getters.ts";

test ("Unique Object's Properties from Data are retrieved correctly", () => {
  expect(isArrsMatch(expectedUniquePropsKeys, retrieveUniquePropsKeys(data))).toBe(true);
})
