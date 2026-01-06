/**
 * @example 
 * properify("proper_name") | properify("proper_name")  
 * // returns "Proper name"
 * @param {string} str 
 * @returns {string} 
 */
export function properify(str) {
  const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());

  return capitalize(str).replace("_", " ").replace("-", " ");
}