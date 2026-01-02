export const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());
export const isSameLength = (arr1, arr2) => arr1.length === arr2.length;
export const normalizeHTML = (html) => html.replace(/\s*(<|>)\s*/g, '$1').trim(); // remove whitespace between nodes