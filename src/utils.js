export const isSameLength = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length;
export const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());
export const normalizeHTML = (html) => html.replace(/\s*(<|>)\s*/g, '$1').trim(); // remove whitespace between nodes