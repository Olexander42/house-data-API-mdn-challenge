export const isSameLength = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length;
export const isArrsMatch = (arr1, arr2) => arr1.every((val, i) => val === arr2[i]);
export const normalizeHTML = (html) => html.replace(/\s*(<|>)\s*/g, '$1').trim(); // remove whitespace between nodes