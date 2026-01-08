import { isArrsMatch } from "../utils.js";
import { data, expectedUniquePropsKeys } from "../fixture.js";
import { retrieveUniquePropsKeys } from "../../common/getters.js";

test ("Unique Object's Properties from Data are retrieved correctly", () => {
  // @ts-ignore
  expect(isArrsMatch(expectedUniquePropsKeys, retrieveUniquePropsKeys(data))).toBe(true);
})